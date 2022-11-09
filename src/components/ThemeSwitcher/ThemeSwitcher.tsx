import * as RadioGroup from "@radix-ui/react-radio-group"
export const ThemeSwitcher = () => {
  return (
    <RadioGroup.Root>
      <RadioGroup.Radio value="Pyro" id="Pyro">
        <RadioGroup.Indicator />
      </RadioGroup.Radio>
      <label htmlFor="Pyro">Pyro</label>
      <RadioGroup.Radio value="Anemo" id="Anemo">
        <RadioGroup.Indicator />
      </RadioGroup.Radio>
      <label htmlFor="Anemo">Anemo</label>
      <RadioGroup.Radio value="Electro" id="Electro">
        <RadioGroup.Indicator />
      </RadioGroup.Radio>
      <label htmlFor="Electro">Electro</label>
    </RadioGroup.Root>
  )
}
