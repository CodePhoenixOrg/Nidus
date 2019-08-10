<?php
namespace Nidus\Controllers;

class Grid extends \Phink\MVC\TPartialController
{
    protected $stmt = null;
    protected $items = array();
    protected $cn = null;
    protected $pager = null;
    protected $onclick = null;
    protected $anchor = null;
    protected $pageCount = 0;
    protected $index = 1;
    public $accordion0 = null;

    public function setPageCount(int $value) : void
    {
        $this->pageCount = $value;
    }

    public function setAnchor(string $value) : void
    {
        $this->anchor = $value;
    }
    
    public function setOnclick(string $value) : void
    {
        $this->onclick = $value;
    }
    
    public function init() : void
    {
//        \Phink\Log\TLog::debug('Je passe par la !');
        try {
            $this->index = $this->request->getQueryArguments('pagenum');
            $this->pageCount = ($this->pageCount) ? $this->pageCount :  $this->request->getQueryArguments('pagecount');
            $stmt = $this->model->getArtistRange($this->index, $this->pageCount);
        
            $range = array();
            while ($row = $stmt->fetch()) {
                array_push($range, $row[0]);
            }
        
            $this->stmt = $this->model->getArtistAlbumTitle($range);
        } catch (\Throwable $e) {
            self::getLogger()->error($e);
        }
    }

    public function getData(int $pagecount, ?int $pagenum)
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->stmt, $pagecount);
        $this->response->setData('grid', $this->data);
    }
}
