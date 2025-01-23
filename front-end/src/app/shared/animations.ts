import { animate, animateChild, query, style, transition, trigger } from "@angular/animations";

export const fadeAnimation = trigger("fadeAnimation", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate("1s ease-out", style({ opacity: 1 })),
  ]),
  transition(":leave", [
    style({ opacity: 1 }),
    animate("0s ease-in", style({ opacity: 0 })),
  ]),
]);


export const routeAnimation = trigger("routeAnimation", [
  transition("* <=> *", [
    style({ position: "relative" }),
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }),
      ],
      { optional: true }
    ),

    query(":enter", [style({ opacity: 0 })], { optional: true }),

    query(":leave", [animate("0.3s ease-in-out", style({ opacity: 0 }))], {
      optional: true,
    }),
    query(":leave", animateChild(), { optional: true }),

    query(":enter", [animate("0.3s ease-in-out", style({ opacity: 1 }))], {
      optional: true,
    }),
    query(":enter", animateChild(), { optional: true }),
  ]),
]);
