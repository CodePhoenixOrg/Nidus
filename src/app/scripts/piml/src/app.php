<?php
if (Phar::running() !== '') {
    include 'phink_library.php';
}

if (Phar::running() === '') {
    require __DIR__ . '/../../../../../vendor/autoload.php';
}

use Phink\Xml\TXmlDocument;

class Piml extends \Phink\UI\TConsoleApplication
{

    /**
     * Application starter
     *
     * @param array $argv List of argunments of the command line
     * @param int $argc Count the number of these arguments
     */
    public static function main($args_v, $args_c)
    {
        (new Piml($args_v, $args_c));
    }

    /**
     * Takes arguments of the command line in parameters.
     * The start make this job fine.
     *
     * @param array $argv List of argunments of the command line
     * @param int $argc Count the number of these arguments
     */
    public function __construct($args_v, $args_c = 0)
    {
        $dir = dirname(__FILE__);
        parent::__construct($args_v, $args_c, $dir);
    }

    /**
     * Entrypoint of a TConsoleApplication
     */
    public function run(): bool
    {
        // if($this->canStop()) {
        //     return;
        // }

        return true;
    }

    public function ignite(): void
    {
        parent::ignite();

        $this->setCommand(
            'xdoc',
            'x',
            'Try to match phx tags with TXmlDocument',
            function () {
                $this->xdoc();
            }
        );

        $this->setCommand(
            'regex',
            'r',
            'Try to match phx tags with regular expressions',
            function () {
                $this->regex();
            }
        );
    }

    protected function loadText(): string
    {
        $lines = file('piml.phtml');
        $text = '';
        foreach ($lines as $line) {
            $text .= trim($line) . PHP_EOL;
        }

        return $text;
    }

    protected function xdoc(): void
    {
        $text = $this->loadText();

        $doc = new TXmlDocument($text);
        $doc->matchAll();
        $matches = $doc->getList();

        foreach ($matches as $match) {
            echo print_r($match, true) . PHP_EOL;
        }
    }

    protected function regex(): void
    {
        $matches = [];
        $re = '/(<phx:.+?>)|(<\/phx:\w+>)/u';
        $re = '/(<phx:TPluginChild.[^>]+?[^\/]>)(.*?)(<\/phx:TPluginChild>)|(<phx:.+?>)|(<\/phx:\w+>)/is';

        $text = $this->loadText();

        preg_match_all($re, $text, $matches, PREG_SET_ORDER | PREG_OFFSET_CAPTURE, 0);
        // preg_match_all($re, $text, $matches, PREG_SET_ORDER, 0);
        $matches0 = $matches[0];
        $matches1 = array_map(function ($match0) {
            $result = [];
            unset($match0[0]);

            foreach ($match0 as $match) {

                if (count($match) === 0) {
                    continue;
                }
                if ($match[1] === -1) {
                    unset($match);
                }

                // $match1 = array_unique($match0);
                $match2 = json_encode($match, JSON_PRETTY_PRINT);
                $match3 = json_decode($match2, true);

                if (count($match3) === 0) {
                    continue;
                }
                $result[] = $match3;
            }

            // if(count($matches2[1]) === 0)
            // {
            //     unset($matches2[1]);
            // }
            // $matches2 = array_unique($matches2);

            return $result;
        }, $matches);

        // $matches2 = array_map(function ($match0) {
        //     $matches3 = array_map(function ($match1) {

        //         $match2 = json_encode($match1, JSON_PRETTY_PRINT);
        //         $match3 = json_decode($match2, true);

        //         return $match3;
        //     }, $match0);
        //     return $matches3;
        // }, $matches1);

        // Print the entire match result
        // foreach ($matches1 as $match) {
        //     if (count($match) === 0) {
        //         continue;
        //     }
        //     echo print_r($match, true) . PHP_EOL;
        // }

        echo print_r($matches1, true);
    }
}

Piml::main($argv, $argc);
