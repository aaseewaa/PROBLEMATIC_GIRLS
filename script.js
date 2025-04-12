
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    const title = document.getElementById("title");
    const aboutPage = document.getElementById("about");
    const introText = document.getElementById("intro");
    const momentCon = document.getElementById("momets-conteiner");
    const text_cont = document.getElementsByClassName("text-cont")
    const load = document.getElementById("loading");
    let isOpen = false;
  
  
    const lineconst = 20;
  
    const repeatText = "LOADING AASEEWAA...";
  
    let linesHTML ="";
    for(let i =0; i<lineconst; i++){
        const lineContent = repeatText.repeat(5);
        linesHTML += `<p class = "loading-line">${lineContent}</p>`;
    }
  
    load.innerHTML = linesHTML;
     
  
  window.addEventListener('load', () => {
      gsap.to(load, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
              load.style.display = "none";
              gsap.to(title, {
                  opacity: 1,
                  duration: 0.01, 
              });
          }
      });
  });
  
    // Функция открытия окна About
    const openAbout = () => {
       title.style.opacity="1"
      isOpen = true;
      // Анимация заголовка: смена текста на CLOSE
      gsap.to(title, {
        rotationX: 90,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          title.textContent = "CLOSE";
          title.style.paddingLeft = "80px";
          gsap.to(title, {
            rotationX: 0,
            duration: 0.2,
            ease: "power2.inOut"
          });
        }
      });
    
  
      // Скрываем основной контент
      momentCon.style.display = "none";
   
      aboutPage.style.display = "block";
      aboutPage.style.backgroundColor="#85BEA9"; 
  
      gsap.fromTo(aboutPage,
        { 
          opacity: 0,
           y: 50
         },
        { 
          opacity: 1,
           y: 0,
           duration: 0.6,
           ease: "power2.out" 
          }
      );
      const text = "Опыт — это уникальный путь, на котором переплетаются судьбы, воспоминания и современная культура. Каждая история, словно отпечаток, открывает перед нами новые грани самих себя, несмотря на то, что на первый взгляд многие пути кажутся схожими. Мы формируем своё мировоззрение через схожие этапы, которые проходит каждая. Поп-культура, окружающая нас ежедневно, становится зеркалом, отражающим наши сомнения, надежды и мечты, объединяя и разделяя нас одновременно. Схожесть нашего опыта, несмотря на индивидуальность каждой истории, позволяет нам находить общие нити, через которые мы все проходили.";
  
      introText.innerHTML = "";
       
      const words = text.replace(/&nbsp;/g, " ").split(" ");
        words.forEach((word, index) => {
          const span = document.createElement("span");
          span.classList.add("intro-word"); 
          span.textContent = word; 
          const spaceNode = document.createTextNode(" ");
          introText.appendChild(spaceNode);
          introText.appendChild(span);
           
          gsap.fromTo(span, 
            { opacity: 0, y: -40 }, 
            { opacity: 1, y: 0, duration: 1, delay: 0.1 * index, ease: "power2.out" }
          );
        }); 
      gsap.to("#intro", {
        y: -100, // Поднимаем текст 
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top top",
          end: "bottom bottom",
          scrub: 1
        }
      });
    };
  
    // Функция закрытия окна About
    const closeAbout = () => {
        
      isOpen = false;
      gsap.to(title, {
        rotationX: -90,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          title.textContent = "PROBLEMATIC GIRLS";
          gsap.to(title, {
            rotationX: 0,
            duration: 0.4,
            ease: "power2.inOut"
          });
        }
      });
  
      gsap.to(aboutPage, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          aboutPage.style.display = "none";
          momentCon.style.display = "flex";
        }
      });
    };
    
    // Анимации для заголовка при наведении главная страница 
    title.addEventListener("mouseenter", () => {
      if (isOpen) return;
      gsap.to(title, {
        rotationX: 90,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          title.textContent = "AASEEWAA";
          title.style.paddingLeft = "50px";
          gsap.to(title, {
            rotationX: 0,
            duration: 0.3,
            ease: "power2.inOut"
          });
        }
      });
    });
  
    title.addEventListener("mouseleave", () => {
      if (isOpen) return;
      gsap.to(title, {
        rotationX: -90,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          title.textContent = "PROBLEMATIC GIRLS";
          gsap.to(title, {
            rotationX: 0,
            duration: 0.3,
            ease: "power2.inOut"
          });
        }
      });
    });
   
    title.addEventListener("click", () => {
      if (!isOpen) {
        openAbout();
      } else {
        closeAbout();
      }
    });
  
    // ScrollTrigger для   (momets-conteiner)  
    gsap.to("#momets-conteiner", {
      y: -200,
      ease: "none",
      scrollTrigger: {
        trigger: "#momets-conteiner",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });
  
    //избегание курсора 
  
    momentCon.addEventListener("mousemove", (e) => {
      const rect = momentCon.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const relativeX = e.clientX - centerX;
      const normalized = relativeX / (rect.width / 3);
      const maxTranslate = 100;
    
      const translateX = -normalized * maxTranslate;
      gsap.to(text_cont, {
        x: translateX,
        duration: 0.3,
        ease: "sine.inOu"
      });
  });
  
    momentCon.addEventListener("mouseleave", () => {
      gsap.to(text_cont, {
         x: 0,
        duration: 0.3,
        ease: "sine.inOu" });
    });
  });
  
  
  // Загрузка данных из JSON 
  fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const work = data.work;
    const content = document.getElementById('momets-conteiner');
    
    Object.values(data.work).forEach(item => { 
      const container = document.createElement('div');
      container.classList.add('text-cont');
      
      const text = document.createElement('div');
      text.classList.add('text');
      text.innerText = item.artist;
      
      const img = document.createElement('img');
      img.src = item.image;
      img.classList.add('image');
      img.style.opacity = "0";
      
      container.appendChild(text);
      container.appendChild(img);
      content.appendChild(container); 
      document.body.style.backgroundColor = "#85BEA9"; 
      gsap.from(container, {
        y: 100,
        duration: 2,
        delay: 0.3,
        scale: 0.6,
        rotateX: 20,
        ease: "power2.out"
      });
       
      gsap.to(text, {
        y: -4,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
       
      text.addEventListener("mouseenter", () => {
        document.body.style.backgroundColor = item.color;
   
        gsap.to(".text-cont:not(:hover)", {
          opacity: 0.05,
          duration: 0.3
        });
        gsap.to(img, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(container, {
           opacity: 1,
           duration: 0.3,
          });
  
        if(img.parentNode !== document.body)
        {
          document.body.appendChild(img);
        }
       
  
        
        gsap.set(img, {
          position: "fixed",
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          width: "70vw",
          clipPath: "inset(20% 25% 20% 25%)"
        });
  
       
         
       
        gsap.to(img, {
          rotationZ: 2,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
  
        const clones = [];
            for (let i = 0; i < 2; i++) {
              const clone = img.cloneNode(true);
              clone.classList.add('fragment');
              clone.style.opacity = "0";
              document.body.appendChild(clone);
              clones.push(clone);
            }
             
            gsap.set(clones[0], {
              position: "fixed",
              left:"25%",
              top: "50%",
              xPercent: -50,
              yPercent: -50,
              width: "70vw", 
              clipPath: "inset(20% 50% 20% 0%)",
              rotationZ: -5  //   поворот  
            });
            
            gsap.set(clones[1], {
              position: "fixed", 
              left:"75%",
              top: "50%",
              xPercent: -50,
              yPercent: -50,
              width: "70vw",
              clipPath: "inset(20% 0% 20% 50%)",
              rotationZ: 5   //   поворот  
            }); 
            clones.forEach(clone => {
              gsap.to(clone, {
                opacity: 1.5,
                duration: 0.5,
                ease: "power2.out"
              });
            }); 
            gsap.to(clones[0], {
              rotationZ: -3,
              duration: 2,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            });
            gsap.to(clones[1], {
              rotationZ: 3,
              duration: 2,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            });
            container.clones = clones;
      });
        
       
      
      // скрываем изображение
      text.addEventListener("mouseleave", () => {
        document.body.style.backgroundColor = "#85BEA9"; 
  
      gsap.to(".text-cont", {
        opacity: 1,
        duration: 0.3
    });
  
        
        gsap.killTweensOf(img);
        gsap.to(img, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(img, {
              position: "",
              left: "",
              top: "",
              xPercent: 0,
              yPercent: 0,
              width: "",
              clipPath: ""
            });
          }
        });
        if (container.clones) {
          container.clones.forEach(clone => {
            gsap.killTweensOf(clone);
            gsap.to(clone, {
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => { clone.remove(); }
            });
          });
          container.clones = null;
        }
  
      })
    });
  })
  .catch(error => {
    console.error("Ошибка загрузки JSON:", error);
  });
  