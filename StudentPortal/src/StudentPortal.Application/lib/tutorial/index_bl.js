
$(function(){ //-----------jQuery-----------

		var choose_list;
		var all_words=[];
		var all_definitions=[];
		var list_words=[];
		var list_definitions=[];
		var word=[];
		var definition=[];
		
		var num_to_show=12;
		var currentPage=0;
		var totalWords;
		var totalPages;
		var postition=0;
		
		//Stores all words into array	-----				
		
		$.post("lib/ajax_words.php",{w: '0'},function(all_words_data){if(all_words_data.length>0){					
			all_words=all_words_data.split(",");	word=all_words;		
		}});  //$.post("vocab1_word.php")
				
		$.post("lib/ajax_words.php",{d:'0'},function(all_definitions_data){if(all_definitions_data.length>0){
			all_definitions=all_definitions_data.split("[]<>");		definition=all_definitions;
			showPage(currentPage, calcTotalPages(word, num_to_show));
			
		}}); //$.post("vocab1_definition.php")
		
				
		//Stores list words into array when changing list -----
		
		$("select[name='display_my_lists']").change(function(){ 
			choose_list=$("select[name='display_my_lists']").val(); //gets the name of the selected list
			
			if(choose_list!="all")
			{					
				$.post("lib/ajax_words.php",{q: choose_list}, function(list_words_data){if(list_words_data.length>0){						
					list_words=list_words_data.split(","); word=list_words;
											
				}}); 
				
				$.post("lib/ajax_words.php",{r: choose_list}, function(list_definitions_data){if(list_definitions_data.length>0){						
					list_definitions=list_definitions_data.split("[]<>"); definition=list_definitions;
					showPage(currentPage, calcTotalPages(word, num_to_show));
				}}); 				
					
			}
			
			else{word=all_words; definition=all_definitions; showPage(currentPage, calcTotalPages(word, num_to_show));}					
			
		});	//$("select[name='display_my_lists']") When changing list		
		
		
		
		$(".menu-bar-1 li a").click(function(){
			num_to_show=$(this).find("input").attr("value"); //gets value from buttons	
			num_to_show=num_to_show*1; //So it doesn't become a string
			
		}); // click ---				
		
		
		$(".menu-bar-3 li #prevPage").click(function(){
			if(currentPage>1)
			{
				currentPage--;
				showPage(currentPage, totalPages);
				showCards(position-(num_to_show*2-1), position-num_to_show);	position-=num_to_show;
			}			 
			
		});
		
		$(".menu-bar-3 li #nextPage").click(function(){			
			if(currentPage<totalPages)
			{								
				currentPage++;	showPage(currentPage, totalPages);
				if(currentPage==1) {showCards(0, num_to_show-1); position=num_to_show-1;}				
				else {showCards(position+1, position+num_to_show);	position+=num_to_show;	}
				
			}
			
		});

	
	function showPage(cp, tp)
	{var temp="****Page "+cp+" of "+tp+"**** "; $("#currentPage").html(temp);}
	
	function calcTotalPages(Insideword, numToShow)
	{
		totalWords=Insideword.length;
		totalPages=totalWords/numToShow;
		if(totalPages%1<.5){totalPages++;}	
		totalPages=Math.round(totalPages);
		return totalPages;
	}
	
	function showCards(startI, endI)
	{		
			//Attach words, definition, and formatting to displayme string
			var display_me="<tr>";
			for(i=startI; i<=endI; i++)
				{				
				display_me+="<td valign=top><div class='box-definition'>"+definition[i]+"</div><div class='box-cover'>"+word[i]+"</div></td>";				
				if((i+1)%3==0){display_me+="</tr><tr>";}				
				}

			$("#box-frame").html(display_me);  //Attach displayme to DIV.  We need to display it before applying css	
										
			$(".box-definition").hide();	//we hide definition otherwise word look funny		
		
			//Hides and shows the cover for the words
			$("#box-frame td").toggle(function(){
									
				$(this).find(".box-cover").fadeOut();	$(this).find(".box-definition").show();
					
				}
			,function()
			{
				$(this).find(".box-cover").fadeIn(); $(this).find(".box-definition").hide(); 
			}
			);// .toggle()
	}
	
						
	function mixit()
	{
		var nq = word.length; var ishf=0;
	 	for( ishf = nq - 1; i > 0; ishf--) 
			{
			    var jshf = Math.round(Math.floor(Math.random() * (ishf + 1)));
			    var tmph = word[ishf];
			    word[ishf] = word[jshf];
			    word[jshf] = tmph;
			}
	}


}); //-----------jQuery-----------



