import { useDrag, useDrop } from 'react-dnd'

interface Props {
  fieldId: string
  position: number
  moveCard: (from: number, to: number) => void
}

export const useDragAndDrop = ({ fieldId, position, moveCard }: Props) => {
  const [, drop] = useDrop({
    accept: 'CARD',

    hover: (item: Record<string, number>) => {
      const dragIndex = item.index
      const hoverIndex = position

      if (dragIndex === hoverIndex) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      item: { id: fieldId, index: position, type: 'CARD' },
      type: 'CARD'
    }),
    [position]
  )

  return { drag, dragPreview, drop, isDragging }
}
