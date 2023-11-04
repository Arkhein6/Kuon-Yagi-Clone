import { SpringValue } from "@react-spring/web"

type circleBGTYPE = {
  transform: SpringValue<string>
}
type HamburgerTYPE = {
  menuState: boolean,
  menuStateHandler: () => void
}

export type {
  circleBGTYPE,
  HamburgerTYPE
}