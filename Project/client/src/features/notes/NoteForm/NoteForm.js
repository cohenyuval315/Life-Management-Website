import React,{useRef,useEffect,useState, useMemo} from 'react'
import './NoteForm.css'
import { Select } from '../../../components/common/Select/Select';
import { createDOMPurify,marked,markedWorkerBuilder } from '../../markdown';
import { WorkerBuilder } from '../../../worker/worker-builder';
import Prism from "prismjs";


import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import a11yDark from "react-syntax-highlighter/dist/esm/styles/prism/a11y-dark";

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);

    const markdownOptions = {
        "async": false,
        "baseUrl": null,
        "breaks": true,
        "extensions": null,
        "gfm": true,
        "headerIds": true,
        "headerPrefix": "",
        "highlight": null,
        "langPrefix": "hljs language-",
        "mangle": true,
        "pedantic": false,
        "silent": false,
        "smartypants": true,
        "tokenizer": null,
        "walkTokens": null,
        "xhtml": false
    }

    marked.setOptions({
        langPrefix: "hljs language-",
        highlight: function(code) {
            // return require("highlight.js").highlightAuto(code, {language:"javascript"})
            // .value;
        }
    });

    const descriptionList = {
    name: 'descriptionList',
    level: 'inline',                                     // Is this a block-level or inline-level tokenizer?
    start(src) { return src.match(/:[^:\n]/)?.index; }, // Hint to Marked.js to stop and check for a match
    tokenizer(src, tokens) {
        const rule = /^(?::[^:\n]+:[^:\n]*(?:\n|$))+/;    // Regex for the complete token, anchor to string start
        const match = rule.exec(src);
        if (match) {
        const token = {                                 // Token to generate
            type: 'descriptionList',                      // Should match "name" above
            raw: match[0],                                // Text to consume from the source
            text: match[0].trim(),                        // Additional custom properties
            tokens: []                                    // Array where child inline tokens will be generated
        };
        this.lexer.inline(token.text, token.tokens);    // Queue this data to be processed for inline tokens
        return token;
        }
    },
    renderer(token) {
        return `<dl>${this.parser.parseInline(token.tokens)}\n</dl>`; // parseInline to turn child tokens into HTML
    }
    };

    const importUrl = {
    extensions: [{
        name: 'importUrl',
        level: 'block',
        start(src) { return src.indexOf('\n:'); },
        tokenizer(src) {
        const rule = /^:(https?:\/\/.+?):/;
        const match = rule.exec(src);
        if (match) {
            return {
            type: 'importUrl',
            raw: match[0],
            url: match[1],
            html: '' // will be replaced in walkTokens
            };
        }
        },
        renderer(token) {
        return token.html;
        }
    }],
    async: true, // needed to tell marked to return a promise
    async walkTokens(token) {
        if (token.type === 'importUrl') {
        const res = await fetch(token.url);
        token.html = await res.text();
        }
    }
    };

    const markdown = `
    # example.com

    :https://example.com:
    `;
    
    marked.use({extensions:[descriptionList]})
    marked.use(importUrl);

const NoteForm = ({note,onSubmit}) => {
    // const [notes,setNotes] = useLocalStorage()
    // const [tags,setTags] = useLocalStorage()
    const titleRef = useRef()
    const markdownRef = useRef()
    // const [title,setTitle] = useState('')
    const [value,setValue] = useState('')
    const [tags,setTags] = useState([])
    const [selectedTags,setSelectedTags] = useState([])
    



    useEffect(() => {
        Prism.highlightAll();
    });

//   const syntaxTheme = oneDark

//   const MarkdownComponents = {
//     const styleMarkdown = css({
//     '.codeStyle, pre, code, code span': {
//         // Your SyntaxHighlighter override styles here
//     },
//         code: {
//         transform: translateZ(0);
//         min-width: 100%;
//         float: left;
//         & > span {
//             display: block;
//         }
//         }
//     'pre code': {
//         // Your code-block styles here
//     },
//     'h3 code': {
//         color: 'inherit'
//     },
//     'span.linenumber': {
//         display: 'none !important'
//     },
//     '[data="highlight"]': {
//         // Your custom line highlight styles here
//     },
//     })

//     code({ node, inline, className, ...props }) {

//     const match = /language-(\w+)/.exec(className || '')
//     const hasMeta = node?.data?.meta

//     const applyHighlights = (applyHighlights) => {
//         if (hasMeta) {
//         const RE = /{([\d,-]+)}/
//         const metadata = node.data.meta?.replace(/\s/g, '')
//         const strlineNumbers = RE?.test(metadata)
//             ? RE?.exec(metadata)[1]
//             : '0'
//         const highlightLines = rangeParser(strlineNumbers)
//         const highlight = highlightLines
//         const data = highlight.includes(applyHighlights)
//             ? 'highlight'
//             : null
//         return { data }
//         } else {
//         return {}
//         }
//     }

//     return match ? (
//         <SyntaxHighlighter
//         style={syntaxTheme}
//         language={match[1]}
//         PreTag="div"
//         className="codeStyle"
//         showLineNumbers={true}
//         wrapLines={hasMeta ? true : false}
//         useInlineStyles={true}
//         lineProps={applyHighlights}
//         {...props}
//         />
//     ) : (
//         <code className={className} {...props} />
//     )
//     },
//   }


    const defaultOptions = {
        ALLOWED_TAGS: [ 'b', 'i', 'em', 'strong', 'a' ], 
        ALLOWED_ATTR: ['href']
    };


    const sanitize = (dirty, options) => ({
    __html: createDOMPurify().sanitize(
        dirty, 
        { ...defaultOptions, ...options }
    )
    });

    const SanitizeMarkdown = ({ markdown, options }) => (
        <div dangerouslySetInnerHTML={sanitize(getMarkdown(markdown), options)} />
    );

    const getMarkdown = (markdown,markdownOptions) => {
        return marked.parse(markdown,markdownOptions)
    }


    function handleValueOnChange(e){
        setValue(e.target.value)
    }

    useEffect(() => {
        if (note !== null && note !== undefined){
            
        }
    }, [])

    // const notesWithTags = useMemo(()=>{
    //     return notes.map((note)=>{
    //         return {...note,tags:tags.filter((tag)=>notes.tagsIds.includes(tag.id))}
    //     })
    // },[notes,tags])
    
    function handleClick(e){
        e.preventDefault()
        const note = getCurrentNote()
        if(validateNote(note)){

        }
        console.log(note)
    }

    function getCurrentNote(){
        const note = {
            title:titleRef.current.value,
            markdown:value,
            tags:selectedTags,
        }
        return note
    }

    function validateNote(note){
        if(note === undefined){
            console.log("NOTE:cannot be undefined")
            return false
        }
        if (note === null){
            console.log("NOTE:cannot be null")
            return false
        }
        if(note.title.length <3){
            console.log("NOTE:length < 3")
            return false
        }
        return true
    }

    function handleSelectedTagsOnChange(e){
        setSelectedTags(e)
    }


    useEffect(() => {
    
      return () => {
        
      }
    }, [])
    
  return (
    <>
        <form className='note-form-form-wrapper'>

            <div className='note-form-fields-container'>
                <div className='note-form-column'>
                    <div className='note-form-title-div'>
                        title <input className='note-form-title-input' ref={titleRef} onKeyDown={(e)=>e.stopPropagation()}
                        //  onChange={titleOnChange}
                            />
                    </div>
                    {/* <div>
                        <div>tags:</div>
                        <div>
                                <Select options={[]} value={selectedTags} onChange={handleSelectedTagsOnChange}/>
                        </div>
                    </div> */}
                </div>



                <div className='note-form-column'>
                    {/* <div>
                        links
                    </div> */}
                </div>
                <div className='note-form-column' style={{color:"black"}}>
                    {/* <div>
                        etc
                    </div> */}
                            <SyntaxHighlighter>
                                {value}
                            </SyntaxHighlighter>
                </div>
                <div className='note-form-column'>
                    <div className='note-form-value-container'>
                        <div className='note-form-textarea-wrapper'>
              
                            <textarea 
                                className='note-form-textarea'
                                value={value}
                                autoFocus={false}
                                onKeyDown={(e)=>e.stopPropagation()}
                                onChange={handleValueOnChange}
                                
                            />

                        </div>
                        <div className='note-form-markdown-preview-wrapper'>

                            <div ref={markdownRef} className='markdown-text' dangerouslySetInnerHTML={{ __html: getMarkdown(value,markdownOptions)}} />

                        </div>
                        
                    </div>
                </div>

                <div className='note-form-column'>
                    <button onClick={handleClick}>save</button>
                </div>
            </div>
        </form>
    </>
  )
}

export default NoteForm
