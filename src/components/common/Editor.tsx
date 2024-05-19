import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as Toast } from '@toast-ui/react-editor';
import { useRef } from 'react'

export default function Editor({content,setContent} : {content? : any, setContent : any}) {
    const editorRef = useRef<Toast>(null);

    const onChange = ()=>{
        const content = editorRef.current?.getInstance().getHTML();
        setContent(content);
    }

    return (
        <Toast
            ref={editorRef}
            initialValue={!content ? " " : content}
            placeholder="내용을 작성해주세요."
            previewStyle="vertical"
            hideModeSwitch={true}
            toolbarItems={
                [
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                ]
            }
            initialEditType="WYSIWYG"
            height="100%"
            onChange={onChange}
        />
    )
}
