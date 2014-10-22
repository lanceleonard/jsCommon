// This library contain common helper functions designed to simplify
// the development of web applications.  

  function clearPanelText( sTargetPanel ) {

    // TODO:: Strengthen error checking here.
    var o = getElementObject( sTargetPanel );
    if ( o == null ) {
       handleError( "Can't find " + sTargetPanel + ". Check your code.");
    } else {
      setTextContent( o, "" );
    }  
  }
  

  function clearResults() { 
    // Clears the results panel.  Companion function to updateResults().
    clearPanelText( "pResults" );
  }

  function clearStatus() { 
  // Clears the status panel.  Companion function to updateStatus().
    clearPanelText( "pStatus" );
  }

  function extractFilePath( sFullFilename ) {
// Given a URL, this returns the path without the filename.  (See also: 
// reduceFilename)

   var sResult = "";
   if ( sFullFilename != "" ) {
      var aTokens = sFullFilename.split( '/' );
      if ( aTokens.length > 0 ) {
         aTokens.pop();
         sResult = aTokens.join( '/' ) + '/';
	  }
   }
   return sResult;
}

function getElementObject( sObjectID ) {
  // Gets a reference to an object in a webpage, with limited error-checking.
  var d = document;
    var oRetval = d.getElementById( sObjectID );
    if ( oRetval == null ) {
      var sError = "GetElementObject did not find an object " + 
                   "with an ID value of '" + sObjectID + "'."
      handleError( sError );
    }
    return oRetval;
  }

  
  function getTextContent( oTarget ) {
  // Returns the text inside an element object, with error-checking.
   
   var sResult = null;
   if ( oTarget == null ) {
      var sError = "GetTextContent could not set text; " + 
                   "object is not assigned.";
      handleError( sError );
    } else {
      sResult = ( 'textContent' in oTarget ) ? 
                   oTarget.textContent : oTarget.innerText;
    }
    return sResult;
  }

  function handleError( sErrorMsg ) {
  // Displays an error message using the technique appropriate for this 
  // application.  Note that the preference is to send errors to the console.
    var s = "Development Error: " + sErrorMsg;
    var w = window;
    if ( w.console ) {
      w.console.warn( s );
    } else {
      updateResults( s );
    }
  }

function reduceFilename( sFullFilename ) {
// Given a URL, this returns just the filename.  See also: extractFilePath.

   var sResult = "";
   if ( sFullFilename != "" ) {
      var aTokens = sFullFilename.split( '/' );
      if ( aTokens.length > 0 ) {
         sResult = aTokens[ aTokens.length - 1 ];
	  }
   }
   return sResult;
}

  function registerEvent( sTargetID, sEventName, fnHandler ) 
  // Registers an event handler.
  // TODO: 1) Rework to search for the attribute before using
  // attachEvent.  OnEventName is standard-based; attachEvent
  // is not. 2) Add filter to exclude the DOMxxx events.  Not
  // every event has an "on" version that needs fallback.
      
  {
     var oTarget = null;
     // See if the target is a supported built-in object.

	 if ( sTargetID == "document" ) {
	   oTarget = document; 
	 } else if ( sTargetID == "window" ) {
	   oTarget = window;
	 } else {
       oTarget = document.getElementById( sTargetID );
     }
	 
    if ( oTarget != null ) 
    {
      if ( oTarget.addEventListener ) {   
         oTarget.addEventListener( sEventName, fnHandler, false );
      } else {
      
        var sOnEvent = "on" + sEventName; 
        if ( oTarget.attachEvent ) 
        {
           oTarget.attachEvent( sOnEvent, fnHandler );
        }
      }
    }
  }
  
  function setTextContent( oTarget, sNewText ) {
  // Set the text inside an element object, with error-checking.
   
   if ( oTarget == null ) {
      var sError = "setTextContent could not set text; object not assigned.";
      handleError( sError );
    } else {
      var sTextProp = ( 'textContent' in oTarget ) ? 
                       "textContent" : "innerText";
      oTarget[ sTextProp ] = sNewText;
    }
  }

  function updatePanelText( sTargetPanel, sMessage )
  // Writes text to a "panel" (div, p, span, etc.).
  {

    // TODO: Strengthen error check and input validation. 
    var sTarget = sTargetPanel;
    o = getElementObject( sTarget );
    if ( o == null ) 
    { 
      handleError( "Can't find panel named '" + sTarget + 
                   "'.  Check your code.");
    } else 
    {
        var sOutput = getTextContent( o );
        if ( sOutput.length > 0 ) {
          sOutput += "\n";
        }
        sOutput += sMessage;
        setTextContent( o, sOutput );
    }
  }

  
  function updateResults( sMessage )
  // Wrapper function for displaying a line of text in the result panel
  {
    sResultPanelName = "pResults";
    updatePanelText( sResultPanelName, sMessage );
  }

  function updateStatus( sMessage, bTimestamp ) 
  // Wrapper function for displaying a message to the user without using alert.
  {
    sStatusPanelName = "pStatus";
    var bAddTime = ( bTimestamp != null ) ? true : false;

    // bTimestamp is optional; if any value is specified, we add the 
    // time to the message.  
    if ( bTimestamp == true ) 
    {
      var t = new Date();
      var sT = " ( " + t.toLocaleTimeString() + " ) ";
      sMessage += sT;
    }
    
    updatePanelText( sStatusPanelName, sMessage );
  }

  function sny() 
  // Simple message for those using the program before it's ready for review.
  { updateResults( "Sorry; this is not implemented yet." ); }

