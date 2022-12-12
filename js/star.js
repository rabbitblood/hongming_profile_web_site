import * as THREE from './three.module.js';

export class star {
    constructor(scene) {
        this.geometry = new THREE.SphereGeometry(Math.random() * 1 + 0.5, 64, 64);
        this.material = new THREE.MeshStandardMaterial({ color: "black" });
        this.star = new THREE.Mesh(this.geometry, this.material);

        this.originalx = Math.random() * 50 - 25;
        this.originaly = Math.random() * 40 - 20;
        this.originalz = Math.random() * -60 - 10;

        this.destinationx;
        this.destinationy;
        this.destinationz;

        this.moveSpeed = 0.002;

        this.newDestination();

        this.star.position.set(
            this.originalx,
            this.originaly,
            this.originalz
        );

        scene.add(this.star);
    }

    scrollY(scrollOffSet) {
        this.star.position.y += scrollOffSet * 0.05;
        this.destinationy += scrollOffSet * 0.05;
        this.originaly += scrollOffSet * 0.05;

        if (this.star.position.y > 20) {
            this.star.position.y -= 40;
            this.destinationy -= 40;
            this.originaly -= 40;
        } else if (this.star.position.y < -20) {
            this.star.position.y += 40;
            this.destinationy += 40;
            this.originaly += 40;
        }
    }

    move() {
        this.star.position.x += (this.destinationx - this.star.position.x) * this.moveSpeed;
        this.star.position.y += (this.destinationy - this.star.position.y) * this.moveSpeed;
        this.star.position.z += (this.destinationz - this.star.position.z) * this.moveSpeed;

        if (Math.abs(this.star.position.x - this.destinationx) < 0.5 ||
            Math.abs(this.star.position.y - this.destinationy) < 0.5 ||
            Math.abs(this.star.position.z - this.destinationz) < 0.5) {
            this.newDestination();
        }
    }

    newDestination() {
        this.destinationx = this.originalx + Math.random() * 5 - 2.5;
        this.destinationy = this.originaly + Math.random() * 5 - 2.5;
        this.destinationz = this.originalz + Math.random() * 5 - 2.5;
    }
}