function loadSkillgraph() {
    $(".skillData").each(function(index, element) {
        // element == this
        var mydata = $(element).data();
        var cnt = 0;
    
        //recursive call with a time delay so user can see graph draw.
        function go() {
            if (cnt++ < mydata['percent']) {
                setTimeout(go, 30);
            }
            $(element).css('width', cnt + '%');
    
        }
    
        go();
    
    });
    
    }
    
    loadSkillgraph();