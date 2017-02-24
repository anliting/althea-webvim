var
    repoUrl='https://cdn.rawgit.com/anliting/webvim',
    commitHash='4f1cc0d2e2996a03ea302b00782936fd80c90675',
    loadVim=()=>module.importByPath(`${repoUrl}/${
        commitHash
    }/src/Vim.js`,{mode:1})
function setUpVim(textarea){
    textarea.addEventListener('keydown',e=>{
        if(!(e.ctrlKey&&e.shiftKey&&e.key=='V'))
            return
        e.preventDefault()
        e.stopPropagation()
        load(textarea,e)
    })
}
async function load(textarea,e){
    if(typeof loadVim=='function')
        loadVim=loadVim()
    textarea.disabled=true
    let Vim=await loadVim
    let vim=new Vim(p=>{
        if(p=='~/.vimrc')
            return localStorage.webvimVimrc
    }),viewDiv=createViewDiv(vim)
    vim.text=textarea.value
    vim._cursor.moveTo(textarea.selectionStart)
    document.head.appendChild(vim.style)
    document.body.appendChild(viewDiv)
    vim.polluteCopy
    vim.focus()
    vim.on('quit',e=>{
        document.head.removeChild(vim.style)
        document.body.removeChild(viewDiv)
        textarea.disabled=false
        textarea.focus()
    })
    vim.write=p=>{
        if(p==undefined){
            textarea.value=vim.text
            textarea.selectionStart=textarea.selectionEnd=
                vim.cursor
        }else if(p=='~/.vimrc')
            localStorage.webvimVimrc=vim.text
    }
}
function createViewDiv(vim){
    let div=document.createElement('div')
    div.style.position='fixed'
    div.style.left='50%'
    div.style.top='50%'
    div.style.transform='translate(-50%,-50%)'
    div.style.width='min-content'
    div.style.zIndex='3'
    div.addEventListener('click',()=>{
        vim.focus()
    })
    vim.width=80
    vim.height=24
    div.appendChild(vim.node)
    return div
}
setUpVim
