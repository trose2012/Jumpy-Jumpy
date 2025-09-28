import kaplay from "kaplay";
import { crew } from "@kaplayjs/crew";

const k = kaplay({ plugins: [crew]});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadCrew("sprite", "bean");

k.setGravity(1600)

k.scene("game", () => {
  const player = k.add([k.pos(120, 80), k.sprite("bean"), area(), body()]);

  onKeyPress("space", () => {
    if (player.isGrounded()) {
      player.jump();
    }
  });


  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
  ]);

  player.onCollide("tree", () => {
    k.addKaboom(player.pos);
    k.shake();
    k.go("lose")
  });

  k.loop(1,() => {
    add([
      rect(48, k.rand(24, 64)),
      area(),
      outline(4),
      pos(width(), height() - 48),
      anchor('botleft'),
      color(255, 180, 255),
      move(k.LEFT, 340),
      "tree",
    ])
  })

})

k.scene("lose", () => {
  k.add([k.text("Game Over"), k.pos(k.center()), k.anchor("center")]);
});

k.go("game")