const Worksheet = {

    init(){

    this.load();

    this.bindInput();

    this.bindCopy();

    this.bindCopyAll();

},

    bindInput(){

        document.querySelectorAll("textarea,input").forEach(field=>{

            field.addEventListener("input",()=>{

                this.save();

            });

        });

    },

    save(){

        const data={};

        document.querySelectorAll("textarea,input").forEach((field,index)=>{

            data[index]=field.value;

        });

        localStorage.setItem(location.pathname+location.search,JSON.stringify(data));

    },

    load(){

        const data=JSON.parse(

            localStorage.getItem(location.pathname+location.search)

        );

        if(!data) return;

        document.querySelectorAll("textarea,input").forEach((field,index)=>{

            if(data[index]!=undefined){

                field.value=data[index];

            }

        });

    },

    bindCopy(){

        document.querySelectorAll(".copy-card").forEach(button=>{

            button.onclick=()=>{

                this.copyCard(button);

            };

        });

    },

    copyCard(button){

        const card=button.closest(".card");

        let text="";

        const title=card.querySelector("h2");

        if(title){

            text+=title.innerText+"\n\n";

        }

        card.querySelectorAll("label").forEach(label=>{

            text+=label.innerText+"\n";

            const next=label.nextElementSibling;

            if(next){

                text+=next.value+"\n\n";

            }

        });

        navigator.clipboard.writeText(text);

        this.toast("Worksheet berhasil disalin");

    },

    toast(message){

        let toast=document.createElement("div");

        toast.className="worksheet-toast";

        toast.innerHTML="✅ "+message;

        document.body.appendChild(toast);

        setTimeout(()=>toast.classList.add("show"),100);

        setTimeout(()=>toast.remove(),2500);

    },

    bindCopyAll(){

    const btn=document.getElementById("copy-all");

    if(!btn) return;

    btn.onclick=()=>{

        this.copyAll();

    };

},

copyAll(){

    let hasil="";

    hasil+="====================================\n";
    hasil+="PROJECT 1\n";
    hasil+="AKU SEORANG DESAINER\n";
    hasil+="====================================\n\n";

    document.querySelectorAll(".card").forEach(card=>{

        const title=card.querySelector("h2");

        if(!title) return;

        hasil+=title.innerText+"\n";

        hasil+="------------------------------------\n";

        card.querySelectorAll("label").forEach(label=>{

            hasil+=label.innerText+"\n";

            const next=label.nextElementSibling;

            if(next){

                hasil+=next.value+"\n\n";

            }

        });

        hasil+="\n";

    });

    navigator.clipboard.writeText(hasil);

    this.toast("Semua worksheet berhasil disalin");

}

};

document.addEventListener("DOMContentLoaded",()=>{

    Worksheet.init();

});