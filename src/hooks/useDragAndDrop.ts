import { useDrag, useDrop } from 'react-dnd'

interface Props {
  fieldId: string
  position: number
  moveCard: (from: number, to: number) => void
}

export const useDragAndDrop = ({ fieldId, position, moveCard }: Props) => {
  const [, drop] = useDrop({
    accept: 'CARD',

    hover: (item: Record<string, any>) => {
      const dragIndex = item.index
      const hoverIndex = position

      if (dragIndex === hoverIndex) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'CARD',
      item: { type: 'CARD', id: fieldId, index: position },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [position],
  )

  return { drop, drag, dragPreview, isDragging }
}
