import React, { Fragment, useEffect, useRef } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';
import ACTIONS from '../config/action';


export default function Editor({ socketRef, roomId,onCodeChange }) {
  const textAreaDiv = useRef();
  const editorRef = useRef(null);


  useEffect(() => {

    async function init() {


      editorRef.current = Codemirror.fromTextArea(textAreaDiv.current, {
        mode: { name: "javascript", json: true },
        theme: 'dracula',
        autoClose: true,
        autoCloseBrackets: true,
        lineNumbers: true
      })

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }

      });

    }

    init();
  }, [])


  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      })
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current])




  return (
    <Fragment>
      <textarea ref={textAreaDiv} id="codemirror"></textarea>
    </Fragment>
  )
}
