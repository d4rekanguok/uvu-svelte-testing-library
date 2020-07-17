import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { render, fireEvent } from '@testing-library/svelte'
import Counter from './Counter.svelte'

const wait = (ms) => new Promise(res => setTimeout(res, ms))

test('It pause the timer', async () => {
  const { getByText, getByDisplayValue } = render(Counter)

  const $input = getByDisplayValue('20')
  const $btnStart = getByText('Start')
  await fireEvent.click($btnStart)
  await wait(1000)
  const $btnPause = getByText('Pause')
  await fireEvent.click($btnPause)
  assert.is($input.value, '19')
})

test.run()