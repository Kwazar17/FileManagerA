<?
 
define ('root_dir','home');
$action = isset( $_GET['action'] ) ? $_GET['action'] : "";
$catpath = isset ($_GET['catpath'])? $_GET['catpath']:"";
$output=array();
switch ($action) {
	case 'opendir': {
		$output['action']='Open Dir';
		$output['dirpath'] =  @root_dir.'/'.$catpath;
		opendirpath($catpath);
	}
} 

function opendirpath ($dir_path) {
	//массив элементов каталога
	static $dir_h; 
	//родительский каталог	
	static $parent_dir;
	 
	if ($dir_path){
		$dir_h = scandir(@root_dir.'/'.$dir_path);
		 
	} else {
	 
		$dir_h = scandir(@root_dir.'/');
	}
	array_splice($dir_h, 0, 2);
	dirOutput ($dir_h, $dir_path);
}

function dirOutput ($mass_dir, $fp){
	echo '<ul id="f-out-ul">';
	foreach ($mass_dir as $f) {
		if(is_dir('home/'.$fp.'/'.$f)) {
			echo '<li class = "f-out-list catalog" data ="'.$fp.'/'.$f.'">'.$f.'</li>';
		} else {
			echo '<li class = "f-out-list file" data ="'.$fp.'/'.$f.'">'.$f.'</li>';
		}
	}	
	echo '</ul>';
}

function isFile($path) {

}

echo '<b>Действие</b> - '.$output['action'].'<br/>';
echo '<b>Искомый путь</b> - '.$output['dirpath'];





?>