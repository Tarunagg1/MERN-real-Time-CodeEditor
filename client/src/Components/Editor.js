import React, { Fragment, useEffect, useRef } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';


export default function Editor() {
  const textAreaDiv = useRef();


  useEffect(() => {
      async function init() {
        Codemirror.fromTextArea(textAreaDiv.current,{
          mode:{name:"javascript",json:true},
          theme:'dracula',
          autoClose:true,
          autoCloseBrackets:true,
          lineNumbers:true
        })
      }

      init();
  }, [])
  


  return (
    <Fragment>
        <textarea ref={textAreaDiv} id="codemirror"></textarea>
    </Fragment>
  )
}
