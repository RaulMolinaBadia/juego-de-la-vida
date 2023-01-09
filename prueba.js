class Tablero {
    cuadricula;

    constructor(x, y) {
        this.cuadricula = [];

        let tablero = document.getElementById("tablero");

        for (let i = 0; i < x; i++) {
            this.cuadricula.push([]);
            let parent = document.createElement("div");
            parent.className = "fila";
            tablero.appendChild(parent);

            for (let j = 0; j < y; j++) {
                this.cuadricula[i].push(new Celula(parent));
            }
        }

        console.log(this.cuadricula);
    }

    //  [x-1,y-1] [x-1,y] [x-1,y+1]
    //   [x,y-1]   [x,y]   [x,y+1]
    //  [x+1,y-1] [x+1,y] [x+1,y+1]
    contarVivasAdyacentes(x, y) {
        let count = 0;
        for (let i = 0; i < this.cuadricula[x]; i++) {
            for (let j = 0; j < this.cuadricula[y]; j++) {
                try {
                    if (this.cuadricula[x - 1 + i][y - 1 + j]) {
                        count++;
                    }
                } catch (error) {}
            }
        }

        return count;
    }

    //Si una célula está viva y tiene dos o tres vecinas vivas, sobrevive.
    //Si una célula está muerta y tiene tres vecinas vivas, nace.
    //Si una célula está viva y tiene más de tres vecinas vivas o solamente una vecina viva, muere.
    next() {
        this.cuadricula.forEach((fila) => {
            fila.forEach((celula) => {
                celula.applyNextEstado();
            });
        });
    }
}

class Celula {
    estado; //0 = muerta, 1 = viva
    nextEstado;
    element;

    constructor(parent) {
        this.element = document.createElement("div");
        this.element.className = "celula";

        this.element.addEventListener("click", () => {
            if (this.estado == 0) {
                this.setViva();
            } else {
                this.setMuerta();
            }
        });

        parent.appendChild(this.element);
        this.setMuerta();
        this.nextEstado = 0;
    }

    setViva() {}

    setMuerta() {}

    getEstado() {}

    applyNextEstado() {}
}

let tablero = new Tablero(20, 20);

function next() {
    tablero.next();
}
