<?php
require dirname(__DIR__).'/../../../../reload.php';

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
    public function run() : bool
    {
        // if($this->canStop()) {
        //     return;
        // }

        return true;
    }
    
    public function ignite() : void
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
        foreach($lines as $line) {
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

        foreach($matches as $match) {
            echo print_r($match, true) . PHP_EOL;
        } 
    }

    protected function regex(): void
    {
        $matches = [];
        $re = '/(<phx:.+?>)|(<\/phx:\w+>)/u';

        $text = $this->loadText();
        
        preg_match_all($re, $text, $matches, PREG_SET_ORDER | PREG_OFFSET_CAPTURE, 0);
        
        // Print the entire match result
        foreach($matches as $match) {
            $match[0][] = mb_strlen($match[0][0]) + $match[0][1];
            echo print_r($match[0], true) . PHP_EOL;
        }            
    }
}

Piml::main($argv, $argc);