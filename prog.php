<?
 
define ('root_dir','home');
$action = isset( $_POST['action'] ) ? $_POST['action'] : "";
$catpath = isset ($_POST['catpath'])? $_POST['catpath']:"";

$output=array();
switch ($action) {
	case 'opendir': {
		$output['action']='Open Dir';
		$output['dirpath'] =  @root_dir.'/'.$catpath;
		opendirpath($catpath);
		break;
	}
	default: {
	opendirpath('');
	break;
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
	$result = '<?xml version="1.0" encoding="utf-8" ?><outputcat>';
	
	 
	foreach ($mass_dir as $f) {
		if(is_dir('home/'.$fp.'/'.$f)) {
			$result.= '<catalog class = "f-out-list catalog" parent ="'.$fp.'" data ="'.$fp.'/'.$f.'" name ="'.$f.'"></catalog>';
			 
		} else {
			$result.= '<files class = "f-out-list file" parent ="'.$fp.'" data ="'.$fp.'/'.$f.'" name ="'.$f.'"></files>';
		}
	}	
	$result.= '<parentdir nam ="'.$fp.'"></parentdir>';
	$result.= '</outputcat>';
	echo $result;
	
}

 

 





?>