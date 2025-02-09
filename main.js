$(document).ready(function(){
    let array = [];
    let heightWindow = $(window).height();
    let widthWindow = $(window).width();

    for(var i = 0; i < 40; i++){
        array.push({
            top: Math.floor(Math.random()*heightWindow),
            left: Math.floor(Math.random()*widthWindow),
            id: i
        })
    }
    array.forEach(function(value){
        let newEllipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        newEllipse.setAttribute('class','ellipse');
        newEllipse.setAttribute('id','ellipse_'+value.id);
        newEllipse.setAttribute('cx',value.left);
        newEllipse.setAttribute('cy',value.top);
        newEllipse.setAttribute('rx',5);
        newEllipse.setAttribute('ry',5);

        $('#svg').append(newEllipse);
    })

    $(window).mousemove(function(event){
        $('line').remove();
        (array.filter(val => Math.abs(val.top - event.pageY) <= 350 && Math.abs(val.left - event.pageX) <= 350)).forEach(function(value){
            let newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            newLine.setAttribute('class','line');
            newLine.setAttribute('id','line_'+value.id);
            newLine.setAttribute('x1',value.left);
            newLine.setAttribute('y1',value.top);
            newLine.setAttribute('x2',event.pageX);
            newLine.setAttribute('y2',event.pageY);
            newLine.setAttribute('stroke','black');
            $('#svg').append(newLine);
        })
    })
    $(window).mouseout(function(event){
        $('line').remove();
    });
    setInterval(function(){
        // Math.random()*(max - min ) + min
        array.forEach(function(value, key){
            let top = Math.random()*((value.top + 2) - (value.top - 2) ) + (value.top - 2);
            let left = Math.random()*((value.left + 2) - (value.left - 2) ) + (value.left - 2);
            array[key].top = top;
            array[key].left = left;

            let $ellipse = $('#ellipse_' + value.id);
            $ellipse.animate({dot: 0},{
                step: () => {$ellipse.attr('cx', left), $ellipse.attr('cy', top)},
                duration: 1
            });

            if($('#line_' + value.id).lengh){
                let $line = $('#line_' + value.id);
                $line.animate({dot: 0},{
                step: () => {$line.attr('x1', left), $line.attr('y1', top)},
                duration: 1
            });
            }
        })
    },500)
    console.log(array);
})
