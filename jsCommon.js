/**
 * This library contain common helper functions designed to simplify
 * the development of web applications.  It's a work in progress.
 *
 * TODO:: 
 * 0.  Consolidate disparate versions of the library into one canoncial version to, ahem, rule them all.  Get to v1.0 release.
 * 1.  Convert inline documentation to jsdoc style and add tools for generating the docs.
 * 2.  Review the use of IDs and objects as parameters.  Consider unifying use into a single process or openly support both techniques.  Use final choice consistently.
 * 3.  When doc generation is working, incororporate the resulting docs into the git wiki.
 * 4.  Rework to register default handlers for error checking, results reporting and similar activities.
 * 5.  Add functions that allow shortcuts for common tasks, e.g. addLine();
 * 6.  Add functionality to register common panel names by default, as well as the ability to change the names as needed by individual apps.
 * 7.  Update getElementObject to return an obj or an array, as appropriate.
 */

//
// Definitions: 
// - "Panel" refers to an HTML element that can display text, e.g. DIV, that supports a textContent property or the innerText method (for older browsers)



// -----
// CORE FUNCTIONS: These are primarily used in samples

  function extractFilePath( sFullFilename, bIncludeTrailing ) {
  /**
   * Given a URL, this returns the path without the filename.  (See also: reduceFilename)
   * @param {string} full filename - The fully qualified filename to parse
   * @param {boolean} include trailing - (Optional) Include trailing separator (default: true)
   * @returns {string} the file path portion of the full filename, if any.
   */

   var sTrailingSep = ( bIncludeTrailing == true) ? kPathSeparator : "";
   var sResult = "";
   if ( sFullFilename != "" ) {
      var aTokens = sFullFilename.split( kPathSeparator );
      if ( aTokens.length > 0 ) {
         aTokens.pop();
         sResult = aTokens.join( kPathSeparator ) + kPathSeparator;
    }
   }
   return sResult;
}

  function getElementObject( sObjectID ) {
  /**
   * Returns the object associated with a given ID value.  Note that this presumes that IDs are unique.
   * @param {string} ID value to search for.
   * @returns {object} Object with the ID value.
   */
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
  /**
   * Returns the text inside an element object using a technique that supports older browsers.
   * @param {object} target object - The object to process
   * @returns {string} the text content associated with the object, if any.
   */
   
   var sResult = null;
   if ( oTarget == null ) {
      var sError = "GetTextContent could not get text; " + 
                   "object is not assigned.";
      handleError( sError );
    } else {
      sResult = ( 'textContent' in oTarget ) ? 
                   oTarget.textContent : oTarget.innerText;
    }
    return sResult;
  }

  function reduceFilename( sFullFilename ) {
  /**
   * Returns the filename associated with a fully qualified filename.  
   * @param {string} full filename - The filename to process
   * @returns {string} the filename portion of the full filename.
   * @see {@link extractFilePath}
   */
   
   var sResult = "";
   if ( sFullFilename != "" ) {
      var aTokens = sFullFilename.split( kPathSeparator );
      if ( aTokens.length > 0 ) {
         sResult = aTokens[ aTokens.length - 1 ];
    }
   }
   return sResult;
  }

  function registerEvent( sTargetID, sEventName, fnHandler ) 
  /**
   * Registers an event handler using techniques designed to provide graceful fallback for older browsers.
   * @param {string} ID of the object to receive the event handler.  Pass 'document' or 'window' to assigned handlers to the corresponding DOM objects.
   * @param {string} Name of the event to handle (without 'on' prefix).
   * @param {function} Handle to the function to handle the event.
   */

  // TODO: 
  // 1) Rework to search for the attribute before using attachEvent.  OnEventName is standard-based; attachEvent is not. 
  // 2) Add code to test the presence of "on" attributes for fallback and skip if not supported.  
  // 3) Currently, there's no fall back when the object cannot be found; need to provide something for that case, even if it's only a basic error handler.
      
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
  
  function setTextContent( oTarget, sNewText, bAppendParam ) {
  /**
   * Set the text inside an element object, with fallback.
   * @param {object} The object to update.
   * @param {string} Content to be put into the object.
   * @param {boolean} Flag indicating if existing text should be kept; default == false.
   */
   
   var bAppendFlag = ( bAppendParam == true ) ? true : false;

   if ( oTarget == null ) {
      var sError = "setTextContent could not set text; object not assigned.";
      handleError( sError );
    } else {
      var sTextProp = ( 'textContent' in oTarget ) ? 
                       "textContent" : "innerText";

//      TODO: Error detection to verify that the target attribure exists
//      if ( oTarget.hasAttribute( ) ...

      if ( bAppendFlag = false ) { oTarget = ""; }
      oTarget[ sTextProp ] += sNewText;
    }
  }

// -----
// HOUSEKEEPING FUNCTIONS

  // Constants
  var kPathSeparator  = "/";
  var kStatusPanelID  = "pStatus";   // Status panel is where progress and status messages appear.
  var kResultPanelID  = "pResults";  // Result panel is where process messages and output appears.
  var kErrorHandler   = "console";   // In this use, error handler refers either to "console" or the ID of a panel (DIV)
  var kCurrentVersion = "0.9.1";     // Current version; call version() to return.

  function clearPanelText( sTargetPanel ) {
  /**
   * Clears the text content of a panel.  An intermediary function, this is generally called by other functions.
   * @param {string} panel ID - The ID assigned to the panel, assumed to be unique to the given page.
   */

    var o = getElementObject( sTargetPanel );
    if ( o == null ) {
       handleError( "Can't find " + sTargetPanel + ". Check your code.");
    } else {
      setTextContent( o, "" );
    }  
  }
  

  function clearResults() { 
  /**
   * Clears the text content of the results panel.  Companion function to updateResults().
   */

    clearPanelText( kResultPanelID );
  }

  function clearStatus() { 
  /**
   * Clears the text content of the status panel.  Companion function to updateStatus().
   */
    clearPanelText( kStatusPanelID );
  }

  function handleError( sErrorMsg ) {
  /**
   * Handles an error message using the currently registered process,
   * @param {string} error message - The message to be handled
   */
   
    // TODO: 
    // 1.  Rework to use the console as the default handler.
    // 2.  Rework to default to the output panel, rather than the results panel.
    var s = "Development Error: " + sErrorMsg;
    var sHandlerError = "" // Flag: Blank when no errors; explanation otherwise.
    if ( kErrorHandler != 'console') {

      // assume the registered error handler value is a string containing the 
      // name of a DOM object that supports text content.

      var obj = getElementObject( kErrorHandler );
      if (obj == null ) {
        sHandlerError = "Unable to get element named '" + kErrorHandler + "'.";
      } else { 
        setTextContent
      }


    } else { // assume it refers to a 

    }

    var w = window;
    if ( w.console ) {
      w.console.warn( s );
    } else {
      updateResults( s );
    }
  }

function registerErrorTarget( sTargetID ) {
/**
 * Indicates where error message are displayed.  Should be the ID of a DOM object or "console".
 */
  kErrorHandler  = sTargetID;
}

function registerResultTarget( sTargetID ) {
/**
 * Indicates where result messages are displayed.  Should be the ID of a DOM object or "console".
 */
  kResultPanelID = sTargetID;
}


  function updatePanelText( sTargetPanel, sMessage )
  /**
   * Writes text to a "panel" (div, p, span, etc.).
   * @param {string} sTargetPanel - the ID of the object to be updated.
   * @param {string} sMessage - Message to be placed in the target object.
   */
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
  /**
   * Writes text to the result panel.
   * @param {string} sMessage - Message to be placed in the results object.
   */
  {
    // TODO: Revise to sent results to registered results panel.
    sResultPanelName = "pResults";
    updatePanelText( sResultPanelName, sMessage );
  }

  function updateStatus( sMessage, bTimestamp ) 
  /**
   * Writes text to the status panel.  Used to avoid using alert() and other deprecated APIs.
   * @param {string} sMessage - Message to be placed in the status object.
   * @param {boolean} (Optional) Timestamp flag - Write timestamp (false, by default)
   */
  {
    // TODO: Revise to sent results to registered results panel.
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

  function version
  /**
   * Returns the current version as a string.
   */
  {
    return kCurrentVersion;
  }

  function sny() 
  /**
   * Simple message to indicate that the feature is incomplete; generally used during development.
   */
  { updateResults( "Sorry; this is not implemented yet." ); }

