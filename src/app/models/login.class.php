<?php

namespace Nidus\Models;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
use Phink\MVC\TModel;
use Phink\Data\Client\PDO\TPdoConnection;
/**
 * Description of login
 *
 * @author david
 */
class Login extends TModel {
    
    public function init(): void
    {
        //\Phink\Log\TLog::dump('OPEN LAdminConnection', $this->connector);        
        $this->connector = TPdoConnection::builder('phoenix_conf');
        $this->connector->open();    
    }

    public function getPermission($login, $password) : ?string
    {
        
        $result = null;
        try {
            if($login != '' && $password != '') {
                //"SELECT usr_id FROM Alphas.dbo.t_user with (nolock) WHERE usr_login=:login and usr_password=:password"
                //"SELECT User FROM user WHERE User=:login and Password=PASSWORD(:password)"
                $stmt = $this->connector->query(
                    "SELECT mbr_name FROM members WHERE mbr_login=:login and mbr_password=:password"
                    , ['login' => $login, 'password' => $password]
                );
                if ($row = $stmt->fetch()) {
                    $result = \Phink\Auth\TAuthentication::setUserToken($row[0], $login);
                }
            }

            //\Phink\Log\TLog::debug('getPermission' . ' : ' . $result);
        } catch(\Throwable $ex) {
            self::getLogger()->exception($ex);
        }
        
        return $result;
    }
    
    public function __destruct() {
        $this->connector->close();
    }

}