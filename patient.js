$(function() {

	var symptom = $('#symptoms').magicSuggest({
		placeholder: 'Add Some Common Symptoms',
		data : '/symptom_list',
		valueField : 'CodeTerm',
		displayField : 'CodeTerm',
		useCommaKey: true,
		name : 'symptom'
	});

	$('#medicalhistory').magicSuggest({
		placeholder: 'Add Some Medical History',
		data : '/medicalcondition_list',
		valueField : 'CodeTerm',
		displayField : 'CodeTerm',
		name : 'medicalhistory',
		useCommaKey: true,
		maxEntryLength: 150,
		maxEntryRenderer: function(v) {
			    return '<div style="color:red">Error Typed Word TOO LONG </div>';
			  },
		value: mCondition,
	});

	$(document.body).on('click', '#own', function() {
		$('#patientName').prop('readonly', true);
		$('#patientDateOfBirth').prop('readonly', true);
		$('#patientAge').prop('readonly', true);

		$(".showhide").css("display", "none")
		$(".str").css("display", "block");
		document.getElementById("age").required = true;

		$("#patientName").val($("#name").val());
		$("#patientDateOfBirth").val($("#dateOfBirth").val());
		$("#patientAge").val($("#age").val());

		var gender = ($('input[name=gender]:checked', '#patientForm').val());
		if (gender == "Male") {
			$("#patientGenderMale").attr('checked', true)
		}
		if (gender == "Female") {
			$("#patientGenderFemale").attr('checked', true)
		}
		if (gender == "Other") {
			$("#patientGenderOther").attr('checked', true)
		}
	});
	$(document.body).on('click', '#familyPerson', function() {
		$('#patientName').prop('readonly', false);
		$('#patientDateOfBirth').prop('readonly', false);
		$('#patientAge').prop('readonly', false);

		$(".showhide").css("display", "block")
		$(".str").css("display", "none");
		document.getElementById("age").required = false;

		$("#patientName").val("");
		$("#patientDateOfBirth").val("");
		$("#patientAge").val("");

	});	 
	
	
	
	  $(document).ready(function(){
	    $("#patientForm").validate({	    	
		  rules: {
			  mobileNumber: {
		      required: true,
		      minlength: 11
		    },
		    
		  }
		});
	  });
	
	/**
	 * Search location on google map
	 * */
	  jQuery(document).ready(function(){
		  var mapOptions = {
		       zoom: 12,
		       mapTypeId: google.maps.MapTypeId.ROADMAP,
		        center: new google.maps.LatLng(23.792884472869144,90.40417671203613)
		     };

		  var map = new google.maps.Map(document.getElementById("map"),mapOptions);
		  google.maps.event.addListener(map, 'click', function(event) {	
			  console.log(event)
			document.getElementById("latitude").value = event.latLng.G;
			document.getElementById("longitude").value = event.latLng.K;
			
		  });

		  var geocoder = new google.maps.Geocoder();  

		     jQuery(function() {
		         jQuery("#searchbox").autocomplete({
		         
		           source: function(request, response) {

		          if (geocoder == null){
		           geocoder = new google.maps.Geocoder();
		          }
		             geocoder.geocode( {'address': request.term,componentRestrictions: {country: 'BD'} }, function(results, status) {
		               if (status == google.maps.GeocoderStatus.OK) {

		                  var searchLoc = results[0].geometry.location;
		               var lat = results[0].geometry.location.lat();
			      
		                  var lng = results[0].geometry.location.lng();
		                  var latlng = new google.maps.LatLng(lat, lng);
		                  var bounds = results[0].geometry.bounds;

		                  geocoder.geocode({'latLng': latlng}, function(results1, status1) {
		                      if (status1 == google.maps.GeocoderStatus.OK) {
		                        if (results1[1]) {
		                         response(jQuery.map(results1, function(loc) {
		                        return {
		                            label  : loc.formatted_address,
		                            value  : loc.formatted_address,
		                            bounds   : loc.geometry.bounds
		                          }
		                        }));
		                        }
		                      }
		                    });
		            }
		              });
		           },
		           select: function(event,ui){
		           var pos = ui.item.position;
		           var lct = ui.item.locType;
		           var bounds = ui.item.bounds;

		      if (bounds){
		       map.fitBounds(bounds);
		      }
		           }
		         });
		     });   
		 });
	 
	
	 var socialHistory = $('#ms-social').magicSuggest({ 
			placeholder: 'Add some social history (family, work, risk factors) ....',
	        data: '/social_history',
	        valueField: 'name',
	        displayField: 'name',
	        name: 'social_history',
	        value: social,
	        useCommaKey: true,
	        maxEntryLength: 70,
	 		maxEntryRenderer: function(v) {
	 			return '<div style="color:red">Error Word TOO LONG </div>';
	 		}
	        }); 
	 var familyHistory = $('#familyHistory').magicSuggest({
			placeholder: 'Add Some Family History',
	        data: '/family_history',
	        valueField: 'CodeTerm',
	        displayField: 'CodeTerm',
	        useCommaKey: true,
	        name: 'family_history'
	        }); 
	        
	 $('#ms-vax').magicSuggest({ 
			placeholder: 'Type some vaccinations',
        	data: '/vaccination_list',
	        valueField: 'CodeTerm',
	        displayField: 'CodeTerm',
	        name: 'vaccination',
	        useCommaKey: true,
	        maxEntryLength: 70,
	 		maxEntryRenderer: function(v) {
	 			return '<div style="color:red">Error Word TOO LONG </div>';
	 		}
	       
	  });
	 
	 $('#current-meds').magicSuggest({
         placeholder: 'Type current medications',
         hideTrigger: true,
         name: 'medications',
         strictSuggest: true,
         maxEntryLength: 150,
         useCommaKey: true,
 		 maxEntryRenderer: function(v) {
 			return '<div style="color:red">Error Word TOO LONG </div>';
 			  },
         data: [],  

     });
	 
	 $("#dateOfBirth").change(function() {
		 var dob = moment($(this).val());
		 var now = moment();		 
		 var age = now.diff(dob, 'years');		 
		 $("#age").val( age );
	}); 
	 $("#patientDateOfBirth").change(function() {		
		 var dob = moment($(this).val());
		 var now = moment();		 
		 var age = now.diff(dob, 'years');		 
		 $("#patientAge").val( age );
		 var value = $("#patientAge").val();	
		 if(parseInt(value) <18){
			$("#vaccinationCondition").css("display","block");
		 }else{
			$("#vaccinationCondition").css("display","none");
		}
		 
	});
	
	 $('#call-timer').timer();
	
	 
	
	 $("#show-past-encounters").click(function(){
		
		 if($("#past-encounters").css('display')=='none'){			
			 $("#show-past-encounters").html('Hide Past Encounters');
			}else{				
				$("#show-past-encounters").html('Show Past Encounters');
			}
		 $("#past-encounters").toggle();
     });
	 
	 
	 
	 
	
});

/**
 * new patient form validation
 * */





/**
 * age validation rule  for subscriber
 * */

function validation(id){	
	var value = $("#"+id).val();	
	if(parseInt(value) >12){
		$("#vaccinationCondition").css("display","none");
	}else{
		$("#vaccinationCondition").css("display","block");
	}
	$("#patientDateOfBirth").val(calculateDob(dob))
	
 } 

function callertAge(id){	
	var value = $("#"+id).val();	
	var dob;
	$("#dateOfBirth").val(calculateDob(dob))
 } 

/**
 * age validation rule  for patient
 * */
function ageValidation(){	
	var value = $("#patientAge").val();	
	if(parseInt(value) < 18){
		$("#vaccinationCondition").css("display","block");
	}else{
		$("#vaccinationCondition").css("display","none");
	}
 }  
