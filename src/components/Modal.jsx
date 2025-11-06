import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';

export default function Modal({
  title,
  children,
  trigger,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  footer,
  open, // 선택: 컨트롤드 모드
  onOpenChange, // 선택: 컨트롤드 모드
  ...contentProps // Dialog.Content에 전달할 추가 props (size 등)
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content {...contentProps}>
            {title ? (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            ) : null}

            <Dialog.Body>{children}</Dialog.Body>

            {footer ? (
              <Dialog.Footer>{footer}</Dialog.Footer>
            ) : (
              <Dialog.Footer>
                {/* 취소: 내부 상태 닫힘 */}
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">{cancelText}</Button>
                </Dialog.ActionTrigger>

                {/* 확인: onConfirm 호출 후 닫고 싶으면 onConfirm에서 처리 */}
                <Button onClick={onConfirm}>{confirmText}</Button>
              </Dialog.Footer>
            )}

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
