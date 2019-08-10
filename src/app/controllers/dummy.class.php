<?php

namespace Something;

//require_once 'Phink/mvc/partial_controller.php';

use Phink\MVC\TPartialController;

/**
 * Description of dummy
 *
 * @author david
 */


class Dummy extends TPartialController {

////put your code here
    protected $text = "Player";
    
    public function load() : void
    {
        //$this->text ;
    }
    
    public function setText(string $value) : void
    {
        $this->text = $value;
    }
    
    public function getText() : string
    {
        return $this->text;
    }
    
    public function getUserByName($userName) {
        
        //$options = ['location' => 'http://www.Nidus.loc/app/webservices/user.php', 'uri' => 'http://www.Nidus.loc'];
        $options = ['location' => 'http://localhost/webservice/user/soap-server.php', 'uri' => 'http://localhost'];
        
        try {
            $client = new \SoapClient(null, $options);
            //$client = new \SoapClient('http://localhost/webservice/user/wsdl');
            
            $user = $client->getUserByName($userName);  
            
            $this->text = json_encode($user);
            
        } catch (\SoapFault $ex) {
            $this->text = var_dump($ex, TRUE);
        }
    }
}

