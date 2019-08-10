<?php
namespace Nidus\Controllers;

use Phink\MVC\TController;
use Phink\MVC\TView;

class Main extends TController
{
    protected $twigResult = '';
    protected $collection0 = null;

    public function load()
    {
        // $this->renderInlineTwig();
    }

    public function getTwigResult()
    {
        return $this->twigResult;
    }

    protected function renderInlineTwig()
    {
        $loader = new \Twig\Loader\ArrayLoader([
            'index' => 'Hello {{ name }}!',
        ]);
        $twig = new \Twig\Environment($loader);
        
        $view = $this->getParent();

        $this->twigResult = $twig->render('index', ['name' => 'David']);
    }

}
