const saved = JSON.parse(localStorage.getItem("estadoMaterias") || "{}");
const previas = {
  prog2: ["prog1"],
  disc2: ["disc1"],
  disc1: ["mat1"],
  micro: ["prog1"],
  anal2: ["anal1"],
  bd1: ["prog2", "disc2"], 
  bd2: ["bd1", "algos"],
  reto1: ["prog2"],
  reto2: ["web", "bd1", "reto1"], // bd1 trae prog2, y web trae so
  reto3: ["reto2", "anal1"], //  anal1 trae so, bd1, redes
  reto4: ["reto3", "anal2"], //  anal2 trae anal1
  reto5: ["reto4", "gestionp"],
  algos: ["prog2", "disc1"],
  so: ["micro"],
  web: ["prog2", "so"],  
  redes: ["prog1"],
  anal1: ["so", "bd1", "redes"],
  prob: ["disc1"],
  seg: ["prog2"],
  sw: ["anal1", "bd2"],
  segpriv: ["seg"],
  formulacion: ["gestionp"],
  modelos: ["disc1", "prob"],
  tesis: ["segpriv", "gestionp", "sw"]
};

const materias = document.querySelectorAll("li");

materias.forEach(materia => {
  const id = materia.id;

  if (saved[id]) {
    materia.classList.add("checked");
  }

  if (previas[id]) {
    const previasCumplidas = previas[id].every(prev => saved[prev]);
    if (!previasCumplidas) {
      materia.classList.add("locked");
    }
  }

  materia.addEventListener("click", () => {
    if (materia.classList.contains("locked")) {
      const pendientes = (previas[id] || []).filter(prev => !saved[prev]);
      alert("Debés aprobar primero: " + pendientes.map(p => document.getElementById(p)?.textContent || p).join(", "));
      return;
    }

    materia.classList.toggle("checked");
    saved[id] = materia.classList.contains("checked");
    localStorage.setItem("estadoMaterias", JSON.stringify(saved));

    for (let clave in previas) {
      if (previas[clave].includes(id)) {
        const siguiente = document.getElementById(clave);
        if (siguiente) {
          const previasCumplidas = previas[clave].every(prev => saved[prev]);
          if (previasCumplidas) {
            siguiente.classList.remove("locked");
          } else {
            siguiente.classList.remove("checked");
            siguiente.classList.add("locked");
            delete saved[clave];
            localStorage.setItem("estadoMaterias", JSON.stringify(saved));
          }
        }
      }
    }
  });
});
