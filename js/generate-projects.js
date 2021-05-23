const THUMBNAIL_CONTAINER_CLASS = "ulc-col-md-6 col-lg-4 mb-5";
const PORTFOLIO_ITEM_CLASS ="portfolio-item mx-auto";
const PORTFOLIO_ITEM_CAPTION_CLASS= "portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100";
const PORTFOLIO_ITEM_CAPTION_CONTENT_CLASS="portfolio-item-caption-content text-center text-white";
const THUMBNAIL_CLASS ="img-fluid";
const TITLE_CLASS="ulc-project-title";
const LOGO_SIZE = 32;
const LOGO_SRC = "assets/img/Official Logo 02_main_logo.svg";


fetch("assets/project-list.json")
    .then(response => response.json())
    .then(json =>
    {
       let thumbnails = document.getElementById("thumbnails");
       let modals = document.getElementById("modals");

       for (let o in json)
       {
           addThumbnail(thumbnails,json[o],o);
           addModal(modals,json[o],o)
       }

    });

fetch("assets/experiment-list.json")
    .then(response => response.json())
    .then(json =>
    {
        let thumbnails = document.getElementById("experiment-thumbnails");
        let modals = document.getElementById("experiment-modals");

        for (let o in json)
        {
            addThumbnail(thumbnails,json[o],o);
            addModal(modals,json[o],o)
        }

    });

function addThumbnail(node, project, name)
{
    let tree = document.createDocumentFragment();

    // CREATE MAIN CONTAINER
    //------------------------------------------------------------------------------------------------------------------
    let main = document.createElement("div");
    main.setAttribute("class", THUMBNAIL_CONTAINER_CLASS);

    // CREATE ITEM
    //------------------------------------------------------------------------------------------------------------------
    let portfolioItem = document.createElement("div");
    portfolioItem.setAttribute("class", PORTFOLIO_ITEM_CLASS);
    portfolioItem.setAttribute("data-toggle", "modal" );
    portfolioItem.setAttribute("data-target", "#" + name);

    // CREATE CAPTION CONTAINER
    //------------------------------------------------------------------------------------------------------------------
    let portfolioItemCaption = document.createElement("div");
    portfolioItemCaption.setAttribute("class", PORTFOLIO_ITEM_CAPTION_CLASS);

    // CREATE CAPTION CONTAINER CONTENT
    //------------------------------------------------------------------------------------------------------------------
    let portfolioItemCaptionContent = document.createElement("div");
    portfolioItemCaptionContent.setAttribute("class",PORTFOLIO_ITEM_CAPTION_CONTENT_CLASS );

    // CREATE CAPTION IMAGE
    //------------------------------------------------------------------------------------------------------------------
    let hoverImg = document.createElement("img");
    hoverImg.setAttribute("width",LOGO_SIZE.toString());
    hoverImg.setAttribute("src",LOGO_SRC);

    // CREATE THUMBNAIL
    //------------------------------------------------------------------------------------------------------------------
    let thumbnail = document.createElement("img");
    thumbnail.setAttribute("class",THUMBNAIL_CLASS);
    thumbnail.setAttribute("src", project["thumbnail"]);
    thumbnail.setAttribute("alt", LOGO_SRC);

    // CREATE TITLE
    //------------------------------------------------------------------------------------------------------------------
    let title = document.createElement("h5");
    title.setAttribute("class",TITLE_CLASS);
    title.innerText= project["name"];

    // PUT EVERYTHING TOGETHER
    //------------------------------------------------------------------------------------------------------------------
    portfolioItemCaptionContent.appendChild(hoverImg);
    portfolioItemCaption.appendChild(portfolioItemCaptionContent);
    portfolioItem.appendChild(portfolioItemCaption);
    portfolioItem.appendChild(thumbnail);
    portfolioItem.appendChild(title);
    main.appendChild(portfolioItem);
    tree.appendChild(main);
    node.appendChild(tree);
}


function addModal(node, project, name)
{
    let tree = document.createDocumentFragment();

    let container = addDiv("portfolio-modal modal fade")
    container.setAttribute("id", name )
    container.setAttribute("tabindex","-1" )
    container.setAttribute("role","dialog" )
    container.setAttribute("aria-labelledby",name+"_label")
    container.setAttribute("aria-hidden","true")

    let dialog = addDiv("modal-dialog modal-xl")
    dialog.setAttribute("role", "document")

    let content = addDiv("modal-content")

    appendHtml(content, '<button class="close" type="button" data-dismiss="modal" aria-label="Close">' +
        '<span class="material-icons" style="color:black !important">close</span> ' +
        '</button>')

    let body = addDiv("modal-body text-center")
    let bodycontainer = addDiv("container")
    let row = addDiv("row justify-content-center")
    let column = addDiv("col-lg-12")
    let title = document.createElement("h2")
    title.setAttribute("class","portfolio-modal-title text-secondary text-uppercase mb-0")
    title.setAttribute("id",name+"_label")
    title.innerText = project["longName"]

    let subtitle = document.createElement("h3")
    subtitle.setAttribute("class", "portfolio-modal-title text-secondary mb-0")
    subtitle.setAttribute("style", "font-size: 20px")
    if (project["artist"] !=="")
    {
        subtitle.innerText ="By " + project["artist"]
    }

    let vidcls = ""
    if (project["squareVideo"]==true)
    {
        vidcls="video-container-square"
    }
    else
    {
        vidcls="video-container-hd"
    }

    let videoContainer = addDiv(vidcls)
    videoContainer.setAttribute("style","margin-top:48px")

    let video = document.createElement("iframe")
    video.setAttribute("class","video")
    video.setAttribute("src", project["video"])
    video.setAttribute("frameborder","0")
    video.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
    video.setAttribute("allowfullscreen","")

    videoContainer.appendChild(video)

    column.appendChild(title);
    column.appendChild(subtitle);
    column.appendChild(videoContainer)

    createImageCarousel(column,name,project["images"])

    composeText(column,name,project["text"])

    appendHtml(column, '<button class="btn btn-primary" style="margin-top:32px" data-dismiss="modal">\n' +
        '<i class="fas fa-times fa-fw"></i>Back</button>')

    row.appendChild(column);
    bodycontainer.appendChild(row)
    body.appendChild(bodycontainer)
    content.appendChild(body)

    dialog.appendChild(content);
    container.appendChild(dialog);
    tree.appendChild(container);
    node.appendChild(tree);
}


function appendHtml(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0)
    {
        el.appendChild(div.children[0]);
    }
}


function addDiv(className)
{
    let item = document.createElement("div");
    item.setAttribute("class", className);
    return item;
}

function createImageCarousel(node,name,images)
{
    if (typeof images === 'undefined')
        return;

    let tree = document.createDocumentFragment();

    let id = "carousel_"+name;
    let container = addDiv("carousel slide");
    container.setAttribute("id", id)
    container.setAttribute("style","padding-top: 1px" );
    container.setAttribute("data-ride", "carousel");

    let inner = addDiv("carousel-inner");

    let list = document.createElement("ol");
    list.setAttribute("class", "carousel-indicators");

    for (let i =0; i<images.length; i++)
    {
        let cls =""

        if (i===0)
        {
            cls = "carousel-item active";
        }
        else
        {
            cls = "carousel-item";
        }

        let indicator = document.createElement("li");
        indicator.setAttribute("data-target","#"+ id);
        indicator.setAttribute("data-slide-to", i.toString())
        list.appendChild(indicator);

        let li = addDiv(cls);
        let img = document.createElement("img");
        img.setAttribute("class", "d-block w-100");
        img.setAttribute("src", images[i]["src"]);
        li.appendChild(img);
        inner.appendChild(li);
    }

    let previous = document.createElement("a");
    let next = document.createElement("a");

    let p_icon = document.createElement("span");
    let n_icon = document.createElement("span");

    previous.setAttribute("class","carousel-control-prev");
    previous.setAttribute("href","#"+id);
    previous.setAttribute("role","button");
    previous.setAttribute("data-slide","prev");
    p_icon.setAttribute("class","carousel-control-prev-icon")
    p_icon.setAttribute("aria-hidden", "true")
    previous.appendChild(p_icon);

    next.setAttribute("class","carousel-control-next")
    next.setAttribute("href", "#"+id);
    next.setAttribute("role","button");
    next.setAttribute("data-slide","next");
    n_icon.setAttribute("class","carousel-control-next-icon")
    n_icon.setAttribute("aria-hidden", "true")
    next.appendChild(n_icon);

    container.appendChild(list);
    container.appendChild(inner);
    container.appendChild(previous);
    container.appendChild(next);

    tree.appendChild(container);
    node.appendChild(tree);
}

function composeText(node,name,texts)
{
    if (typeof texts === 'undefined')
        return;

    let tree = document.createDocumentFragment();

    let container = addDiv("");
    container.setAttribute("style","margin-top:32px")

    for (let i =0; i<texts.length; i++)
    {

     var para = document.createElement("p")
        para.setAttribute("class","mb-5")
        para.innerText = texts[i]["paragraph"]
        container.appendChild(para)
    }

    tree.appendChild(container);
    node.appendChild(tree);
}