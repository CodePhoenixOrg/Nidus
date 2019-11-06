<?php
namespace Nidus\Models;

use Phink\Data\Client\PDO\TPdoConnection;
// require_once APP_DATA . 'amarok_connection.php';

class Home extends \Phink\MVC\TModel {

    public function init(): void
    {
        $this->connector = TPdoConnection::builder('amarok_conf');
        $this->connector->open();
        
    }

    public function getArtistRange()
    {
        $sql = <<<SQL
            SELECT DISTINCT
                    y.name as year
                FROM
                    tracks t
                INNER JOIN albums s ON t.album = s.id
                INNER JOIN years y ON t.year = y.id AND y.name > '0'
                INNER JOIN artists a ON a.id = s.artist
                ORDER BY y.name
            SQL;
        
$stmt = $this->connector->query($sql);
        
return $stmt;
    }
    
    public function getArtistAlbumTitle(array $artistRange = null)
    {
        //$sqlConfig = new TPdoConfiguration("pf8-mysql.online.net", "asphaltu", "1p2+ar", "asphaltu");
        //$sqlConfig = new TPdoConfiguration("192.168.1.1", "wfuser", "25643152", "asphaltu");
        $range = '';
        if($artistRange != null) {
            $range = 'AND y.name IN (' . implode(', ', $artistRange) . ')';
        }
        
        $sql = <<<SQL
            SELECT 
                y.name AS 'Year',
                a.id AS 'ArtistId',
                a.name AS 'Artist',
                s.id AS 'AlbumId',
                s.name AS 'Album',
                t.id AS 'TitleId',
                t.title AS 'Title'
            FROM
                tracks t
                    INNER JOIN
                albums s ON t.album = s.id
                    INNER JOIN
                years y ON t.year = y.id 
                    INNER JOIN
                artists a ON a.id = s.artist $range
            ORDER BY y.name, a.name, t.year, t.id
            SQL;

$stmt = $this->connector->query($sql);
        
return $stmt;
    }    
}
