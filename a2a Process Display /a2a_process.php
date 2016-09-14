<?php
function a2a_process($user_class_toggles){
	#Function generates The 5 images and text for "Plan, Learn, Analyze, Share, Act"

	#By default all icons are disabled, p
	$default_class_toggles = [
		'process_plan' => false,
		'process_learn' => false, 
		'process_analyze' => false,
		'process_share' => false,
		'process_act' => false,
		'process_all' => false, #process_all is used to set all of the values to true
	];

	$merged_class_toggles = array_merge($default_class_toggles, $user_class_toggles);

	if($merged_class_toggles['process_all'] == true){
		$merged_class_toggles = [
			'process_plan' => true,
			'process_learn' => true,
			'process_analyze' => true,
			'process_share' => true,
			'process_act' => true,
		];
	}
	
	#generate a div containing a wrapper and each of the five components
	$content = '<div class = "process_wrapper">';
	$content .= "<div class =\"" . ($merged_class_toggles['process_plan']    ? "process_plan"    : "process_not_active") . '"><p>Plan</p></div>';
	$content .= "<div class =\"" . ($merged_class_toggles['process_learn']   ? "process_learn"   : "process_not_active") . '"><p>Learn</p></div>';
	$content .= "<div class =\"" . ($merged_class_toggles['process_analyze'] ? "process_analyze" : "process_not_active") . '"><p>Analyze</p></div>';
	$content .= "<div class =\"" . ($merged_class_toggles['process_share']   ? "process_share"   : "process_not_active") . '"><p>Share</p></div>';
	$content .= "<div class =\"" . ($merged_class_toggles['process_act']     ? "process_act"     : "process_not_active") . '"><p>Act</p></div>';
	$content .= '</div><!-- /process_wrapper -->';
return $content;
}

#Convert php funtion to Wordpress shortcode
add_shortcode( 'a2a_process', "a2a_process");
?>