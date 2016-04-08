/* Returns a date shifted a certain offset 
 * @param offset the UTC hour offset to shift
 * @returns new date object shifted the UTC amount
 */
Date.prototype.getOffsetDate = function( offset ) {
  utc = this.getTime() + (this.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000*offset));
}

$(document).ready(function(){

    var myDate = new Date();

    // Run Digital Clock
    $("#digital_clock .seconds").text(zPad(myDate.getSeconds()));
    $("#digital_clock .minutes").text(zPad(myDate.getMinutes()));
    $("#digital_clock .hours").text(zPad(parseInt(myDate.getHours())%12));

    setInterval(function(){ incrementClockText($("#digital_clock")) }, 1000 );
    
    // Run Analog Clocks
    initializeHands({element: $("#analog_clock"), date: myDate } )
    initializeHands({element: $("#second_analog_clock"), date: myDate.getOffsetDate(-7)});
    initializeHands({element: $("#third_analog_clock"), date: myDate.getOffsetDate(-4)});
    initializeHands({element: $("#fourth_analog_clock"), date: myDate.getOffsetDate(2)});
    initializeHands({element: $("#fifth_analog_clock"), date: myDate.getOffsetDate(8)});

});

function incrementClockText( element ) {
  var s = parseInt($(".seconds", element).text());
  var m = parseInt($(".minutes", element).text());
  var h = parseInt($(".hours", element).text());
  if( s < 59 ) {
    $(".seconds", element).text( zPad(s+1) );
  } else {
    $(".seconds", element).text( "00" );
    //increment the minutes too
    if( m < 59 ) {
      $(".minutes", element).text( zPad(m+1) );
    } else {
      $(".minutes", element).text( "00" );
      //increment the hours too
      if( h < 12 ) {
        $(".hours", element).text( zPad(h+1) )
      } else {
        $(".hours", element).text( "01" );
      }
    }
  }
}
//increment a clock's given attribute
function incrementClock( element, attr ) {
  var s = parseInt($(".seconds", element).attr(attr));
  var m = parseInt($(".minutes", element).attr(attr));
  var h = parseInt($(".hours", element).attr(attr));
  //default attr of "data-value"
  attr = typeof attr !== "undefined" ? attr : "data-value";

  if( s < 59 ) {
    $(".seconds", element).attr( attr, zPad(s+1) );
  } else {
    $(".seconds", element).attr( attr, "00" );
    //increment the minutes too
    if( m < 59 ) {
      $(".minutes", element).attr( attr, zPad(m+1) );
    } else {
      $(".minutes", element).attr( attr, "00" );
      //increment the hours too
      if( h < 12 ) {
        $(".hours", element).attr( attr, zPad(h+1) )
      } else {
        $(".hours", element).attr( attr, "01" );
      }
      rotateHand( $(".hours", element), $(".hours", element).attr(attr), "12" );
    }
    rotateHand( $(".minutes", element), $(".minutes", element).attr(attr), "60" );
  }
  rotateHand( $(".seconds", element), $(".seconds",element).attr(attr), "60" );
}

function rotateHand( element, val, max ) {
  $(element).css("transform","rotate("+((val/max)*360)+"deg)");
}

function initializeHands( options ) {
  var element = (typeof options.element !== "undefined") ? options.element : null;
  var attr = (typeof options.attr !== "undefined") ? options.attr : "data-value";
  var date = (typeof options.date !== "undefined") ? options.date : new Date();

  var internalContents = "";
  internalContents += "<div class=\"minutes\"><div class=\"hand\"></div></div>\n";
  internalContents += "<div class=\"hours\"><div class=\"hand\"></div></div>\n";
  internalContents += "<div class=\"seconds\"><div class=\"hand\"></div></div>\n";
  internalContents += "<div class=\"labels\">\n";
  internalContents += "<div class=\"label\">I</div>\n";
  internalContents += "<div class=\"label\">II</div>\n";
  internalContents += "<div class=\"label\">III</div>\n";
  internalContents += "<div class=\"label\">IV</div>\n";
  internalContents += "<div class=\"label\">V</div>\n";
  internalContents += "<div class=\"label\">VI</div>\n";
  internalContents += "<div class=\"label\">VII</div>\n";
  internalContents += "<div class=\"label\">VIII</div>\n";
  internalContents += "<div class=\"label\">IX</div>\n";
  internalContents += "<div class=\"label\">X</div>\n";
  internalContents += "<div class=\"label\">XI</div>\n";
  internalContents += "<div class=\"label\">XII</div>\n";
  internalContents += "</div>\n";
    
  $(element).append(internalContents);

  $(".seconds", element).attr(attr, zPad(date.getSeconds()));
  $(".minutes", element).attr(attr, zPad(date.getMinutes()));
  $(".hours", element).attr(attr, zPad(date.getHours()));

  setInterval(function(){ incrementClock(element,attr) }, 1000 );

  rotateHand($(".seconds",element), $(".seconds", element).attr(attr), 60);
  rotateHand($(".minutes",element), $(".minutes", element).attr(attr), 60);
  rotateHand($(".hours",element), $(".hours", element).attr(attr), 12);

}

//function
function zPad( num ) {
  return strPad( num.toString(), "0", 2 );
}
//pad str with a char for len characters
function strPad( str, char, len ) {
  var diff = len - str.length;
  //console.log( "diff is " + diff + " with len [" + len + "] + str.length [" + str.length + "] " );
  if( diff >= 1 ) {
    return char.repeat(diff) + str;
  } else {
    return str;
  }
}
