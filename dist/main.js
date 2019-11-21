const loadPage = async function() {
    $(".things").empty()
    let things = await $.get('/things')
    for (let thing of things) {
        $(".things").append(`<div>${thing.text}</div>`)
    }
}

loadPage()

$("button").on("click", async function() {
    let input = $("input").val()
    await $.post('/thing', {text: input})
    loadPage()
})