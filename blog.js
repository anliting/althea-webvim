require.js([
    'https://cdn.rawgit.com/anliting/vimontheweb/42158900a84a07fe6a850a4b5096131f99e9e5f4/Vim.js',
    'https://cdn.rawgit.com/sytelus/CryptoJS/7fbfbbee0d005b31746bc5858c70c359e98308e5/rollups/aes.js'
],()=>{
    blog.addEventListener('pageLoad',page=>{
        page.textarea_comment__form_comment.addEventListener(
            'focus',
            ()=>{
                var vim
                page.textarea_comment__form_comment.placeholder=
                    'Ctrl+Shift+V to enable/disable Vim.'
                vim=new Vim
                vim.setup(page.textarea_comment__form_comment)
                vim.afterkeydown_textarea=
                vim.afterinput_textarea=()=>{
                    vim.textarea.rows=Math.max(
                        2,vim.textarea.value.split('\n').length
                    )
                }
            }
        )
    })
})
