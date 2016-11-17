// Author:
// Desc: This file contains the main UI manipulation logic

var app = angular.module('app', []);

app.controller('MainController', function($scope, $compile) {
    function getAttrsFromData(data){
        var attrs = $.extend({},data);
        for(var key in attrs){
            var newKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            if(newKey != key){
                attrs[newKey] = attrs[key];
                delete attrs[key];                
            }
        }
        return attrs;
    }
    
    var columnStack = [];
    function renderFilesScreen(){
        var tree = [
            {
                 isFolder:true
                ,isFile:false
                ,name:"Work"
                ,children:[
                    {
                         isFolder:false
                        ,isFile:true
                        ,name:"myfile.txt"
                        ,children:[]
                    },
                    {
                         isFolder:true
                        ,isFile:false
                        ,name:"Q1"
                        ,children:[
                            {
                                 isFolder:false
                                ,isFile:true
                                ,name:"myspreadsheet.cls"
                                ,children:[]
                            }
                        ]
                    }
                ]
            },
            {
                 isFolder:true
                ,isFile:false
                ,name:"School"
                ,children:[]
            },
            {
                 isFolder:true
                ,isFile:false
                ,name:"Taxes"
                ,children:[]
            }
        ];

        columnStack.push(tree);
        $.each(tree, function(i,item){
            var el = $("<tree-item></tree-item>");

            var attrs = getAttrsFromData(item);

            // Don't need the following attributes
            delete attrs.children; 

            el.attr(attrs);

            $(".fileColumn").first().append(el);
            $compile(el)($scope);
        })
    }
    
    (function filesEvents(){
        $("#filesScreen").on("click","tree-item .name",function(){
            var name = $(this).text();
            var parent = $(this).closest(".fileColumn");
            var colIndex = parent.index();
            
            // [ Create the new column and delete any extra ones ]
            $(".fileColumn").eq(colIndex).nextAll().remove();
            
            var newCol = $("<div class='fileColumn'></div>");
            $("#fileColumnHolder").append(newCol);
            
            // [ Remove all the old columns from the column stack ]
            for(var i = columnStack.length; i > colIndex; i--){
                columnStack.splice(i,1);
            }
            
            // [ Add the new column to the column stack ]
            var branch = columnStack[colIndex];
            var newBranch = [];
            for(var i = 0; i < branch.length; i++){
                if(name == branch[i].name){
                    newBranch = branch[i].children;
                    columnStack.push(newBranch);
                    break;
                }
            }
        
            // [ Add the item elements to column ]
            $.each(newBranch, function(i,item){
                var el = $("<tree-item></tree-item>");

                var attrs = getAttrsFromData(item);

                // Don't need the following attributes
                delete attrs.children; 

                el.attr(attrs);

                newCol.append(el);
                $compile(el)($scope);
            })            
            
        })
    })();

    (function loginEvents(){
        
        // [ Login user ]
        $("#login").click(function(){
            var w = $(window).width();
            var h = $(window).height();

            $("#loginScreen").fadeToggle("fast",function(){
                $("#filesScreen").fadeToggle("fast");
                renderFilesScreen();
            });


            $({ t:0 }).animate({ t: 1},{
                 duration:300
                ,step:function(t){
                    window.resizeTo(w + t*(800 - w), h + t*(600 - h));
                }
            })
        });       
    })();
 
});

// [ Async load all the components ]
// - Declutters the head tag in index.html
// - App loads faster
(function(){
	var comps = [
		 "tree-item"
	];

	$.each(comps,function(i,name){
		$("body").append("<link rel='stylesheet' type='text/css' href='comps/" + name + "/styles.css'></link>");
	});

	$.each(comps,function(i,name){
		$("body").append("<script src='comps/" + name + "/script.js'></script>");
	});
})();
