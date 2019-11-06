<?php


namespace Nidus\Models;

use Phink\Data\Client\PDO\TPdoConnection;
// require_once APP_DATA . 'amarok_connection.php';


class Grid extends \Phink\MVC\TModel
{
    public function init(): void
    {
        $this->connector = TPdoConnection::builder('amarok_conf');
        $this->connector->open();
    }

    public function getArtistRange($start, $count)
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

        $start = (!$start) ? 1 : $start;
        $sql .= PHP_EOL . ' LIMIT ' . (($start - 1) * $count). ', ' . $count . PHP_EOL;
        $stmt = $this->connector->query($sql);
        
        return $stmt;
    }
    
    public function getArtistAlbumTitle(array $artistRange = null)
    {
        $stmt = null;
        //$sqlConfig = new TPdoConfiguration("pf8-mysql.online.net", "asphaltu", "1p2+ar", "asphaltu");
        //$sqlConfig = new TPdoConfiguration("192.168.1.1", "wfuser", "25643152", "asphaltu");
        $range = '';
        if ($artistRange != null) {
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
                t.title AS 'Title',
                t.length AS 'Duration',
                u.rpath AS 'TrackPath'
            FROM
                tracks t
                    INNER JOIN
                urls u ON t.url = u.id
                    INNER JOIN
                albums s ON t.album = s.id
                    INNER JOIN
                years y ON t.year = y.id 
                    INNER JOIN
                artists a ON a.id = s.artist $range
            ORDER BY y.name, a.name, t.year, t.id
            SQL;

        try {
            $stmt = $this->connector->query($sql);

        } catch(\Throwable $e) {
            self::getLogger()->error($e);
        } finally {
            return $stmt;

        }
        
    }

//    function connectSQLServer() {
//        $sqlConfig = new TSqlServerConfiguration('192.168.1.3', 'david', '25643152', 'Asphaltu');
//        $this->cn = new TSqlServerConnection($sqlConfig);
//
//        $this->cn->open();
//        $this->cmd = new TSqlServerCommand($this->cn);
//        $this->cmd->queries->setSelect("SELECT [EmployeeID]
//          ,[NationalIDNumber]
//          ,[ContactID]
//          ,[LoginID]
//          ,[ManagerID]
//          ,[Title]
//          ,[BirthDate]
//          ,[MaritalStatus]
//          ,[Gender]
//          ,[HireDate]
//          ,[SalariedFlag]
//          ,[VacationHours]
//          ,[SickLeaveHours]
//          ,[CurrentFlag]
//          ,[ModifiedDate]
//        FROM [AdventureWorks].[HumanResources].[Employee]");
//    }
//
//    function connectSQLite() {
//        $sqlConfig = new TSqliteConfiguration(DOCUMENT_ROOT . 'asphaltu.db');
//        $this->cn = new TSqliteConnection($sqlConfig);
//
//        $this->cn->open();
//        $this->cmd = new TSqliteCommand($this->cn);
//        $this->cmd->getQueries()->setSelect('select * from menus');
//
//    }

    public function __destruct()
    {
        $this->connector->close();
    }
}
