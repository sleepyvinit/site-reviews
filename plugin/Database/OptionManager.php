<?php

namespace GeminiLabs\SiteReviews\Database;

use GeminiLabs\SiteReviews\Application;
use GeminiLabs\SiteReviews\Helper;

class OptionManager
{
    /**
     * @var array
     */
    protected $options;

    /**
     * @return string
     */
    public static function databaseKey($version = null)
    {
        if (null === $version) {
            $version = explode('.', glsr()->version);
            $version = array_shift($version);
        }
        return glsr(Helper::class)->snakeCase(
            Application::ID.'-v'.intval($version)
        );
    }

    /**
     * @return array
     */
    public function all()
    {
        if (empty($this->options)) {
            $this->reset();
        }
        return $this->options;
    }

    /**
     * @param string $path
     * @return bool
     */
    public function delete($path)
    {
        $keys = explode('.', $path);
        $last = array_pop($keys);
        $options = $this->all();
        $pointer = &$options;
        foreach ($keys as $key) {
            if (!isset($pointer[$key]) || !is_array($pointer[$key])) {
                continue;
            }
            $pointer = &$pointer[$key];
        }
        unset($pointer[$last]);
        return $this->set($options);
    }

    /**
     * @param string $path
     * @param mixed $fallback
     * @return mixed
     */
    public function get($path = '', $fallback = '')
    {
        return glsr(Helper::class)->dataGet($this->all(), $path, $fallback);
    }

    /**
     * @param string $path
     * @return bool
     */
    public function getBool($path)
    {
        return 'yes' == $this->get($path)
            ? true
            : false;
    }

    /**
     * @param string $path
     * @param mixed $fallback
     * @return mixed
     */
    public function getWP($path, $fallback = '')
    {
        $option = get_option($path, $fallback);
        return empty($option)
            ? $fallback
            : $option;
    }

    /**
     * @return string
     */
    public function json()
    {
        return json_encode($this->all());
    }

    /**
     * @return array
     */
    public function normalize(array $options = [])
    {
        $options = wp_parse_args(
            glsr(Helper::class)->flattenArray($options),
            glsr(DefaultsManager::class)->defaults()
        );
        array_walk($options, function (&$value) {
            if (!is_string($value)) {
                return;
            }
            $value = wp_kses($value, wp_kses_allowed_html('post'));
        });
        return glsr(Helper::class)->convertDotNotationArray($options);
    }

    /**
     * @return bool
     */
    public function isRecaptchaEnabled()
    {
        $integration = $this->get('settings.submissions.recaptcha.integration');
        return 'all' == $integration || ('guest' == $integration && !is_user_logged_in());
    }

    /**
     * @return array
     */
    public function reset()
    {
        $options = get_option(static::databaseKey(), []);
        if (!is_array($options) || empty($options)) {
            delete_option(static::databaseKey());
            $options = wp_parse_args(glsr()->defaults, ['settings' => []]);
        }
        $this->options = $options;
    }

    /**
     * @param string|array $pathOrOptions
     * @param mixed $value
     * @return bool
     */
    public function set($pathOrOptions, $value = '')
    {
        if (is_string($pathOrOptions)) {
            $pathOrOptions = glsr(Helper::class)->dataSet($this->all(), $pathOrOptions, $value);
        }
        if ($result = update_option(static::databaseKey(), (array) $pathOrOptions)) {
            $this->reset();
        }
        return $result;
    }
}
