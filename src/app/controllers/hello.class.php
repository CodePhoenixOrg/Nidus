<?php
namespace Nidus\Controllers;

use Phink\MVC\TController;

class Hello extends TController
{
    public function renderTwig() : void
    {
        // return $this->renderTwigByName('hello.phtml', ['name' => 'David']);
        // return $this->renderThisTwig(['name' => 'David']);
    }

    public function afterBinding() : void
    {
        $this->getView()->setTwig(['name' => 'David']);
    }
}