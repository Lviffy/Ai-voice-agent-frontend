import { useToast } from './ToasterProvider'

export const PlaygroundToast = () => {
  const { toastMessage, setToastMessage } = useToast()

  if (!toastMessage) return null

  const color = toastMessage?.type === 'error' ? 'red' : toastMessage?.type === 'success' ? 'green' : 'amber'

  return (
    <div className={`fixed top-4 left-4 right-4 z-50 text-sm break-words px-4 pr-12 py-2 bg-${color}-950 rounded-sm border border-${color}-800 text-${color}-400`}>
      <button
        className={`absolute right-2 border border-transparent rounded-md px-2 hover:bg-${color}-900 hover:text-${color}-300`}
        onClick={() => {
          setToastMessage(null)
        }}
      >
        ✕
      </button>
      {toastMessage?.message}
    </div>
  )
}
