<?php

namespace Hatcherry\Controllers;

use Phink\MVC\TController;
use Puzzle\Menus;
use Phink\Registry\TRegistry;

class Login extends TController
{
    private $_login = '';
    private $_password = '';
    protected $headers = '';
    protected $id = 0;
    protected $lg = '';

    public function init(): void
    {
        foreach ($_SERVER as $key => $value) {
            if (substr($key, 0, 5) == 'HTTP_') {
                $this->headers .= "$key = $value<br />";
                //                $this->headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value; 
            }
        }
        $this->lg = TRegistry::ini('application', 'lang');
        $db_prefix = TRegistry::ini('data', 'db_prefix');
        $conf = TRegistry::ini('data', 'conf');

        $menus = new Menus($this->lg, $db_prefix);
        $this->id = $menus->getPageId($conf, "mkmain.php");
    }

    public function logout(): void
    {
        session_destroy();
        session_start();     

        $this->response->setMessage("logout");
    }

    public function authenticate($login, $password, $container): void
    {
        $result = false;

        $this->_login = $login;
        $this->_password = $password;

        $token = null;
        if ($this->_login && $this->_password) {
            $token = $this->model->getPermission($this->_login, $this->_password);
        }

        if ($token !== null) {
            // $this->response->setData('redirect', "page.html?id={$this->id}&lg={$this->lg}");
            $this->response->setData('redirect', "main.html");
            $this->response->setReturn(200);
        } else {
            $this->response->setToken($token);
            $this->response->setReturn(403);
        }
    }
}
