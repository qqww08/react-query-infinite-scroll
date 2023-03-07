function asd() {
  console.log(1);
}
export function BottomSheet(arg: string) {
  document.addEventListener("DOMContentLoaded", () => {
    (document.querySelector(`#${arg}`) as any).innerHTML = "<div>asd</div>";
  });
}
