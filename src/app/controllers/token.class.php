<?php
namespace Nidus\Controllers;

//require_once 'Phink/mvc/controller.php';
//require_once 'Phink/core/log.php';
//require_once 'Phink/crypto/crypto.php';

use Phink\MVC\TPartialController;
use Phink\Crypto\TCrypto;

/**
 * Description of logme
 *
 * @author david
 */

 class Token extends TPartialController {
   //put your code here
    
    protected $label = '';
    protected $token = '';
    
    
    public function setLabel(sring $value) : void
    {
        $this->label = $value;
    }
    
    public function getLabel() : string
    {
        return $this->label;
    }
    
    public function showToken() : void
    {
        $this->token = TCrypto::generateToken();
    }
    
}
