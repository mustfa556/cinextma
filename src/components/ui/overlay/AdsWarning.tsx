"use client";

import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ScrollShadow,
  Link,
} from "@heroui/react";

const AdsWarning: React.FC = () => {
  const [seen, setSeen] = useLocalStorage<boolean>({
    key: "ads-warning-seen",
    getInitialValueInEffect: false,
  });
  const [opened, handlers] = useDisclosure(!seen);

  const handleSeen = () => {
    handlers.close();
    setSeen(true);
  };

  return (
    <Modal
      hideCloseButton
      isOpen={opened}
      placement="center"
      backdrop="blur"
      size="3xl"
      isDismissable={false}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center text-3xl uppercase">
          Before you watch!
        </ModalHeader>
        <ModalBody>
          <ScrollShadow hideScrollBar className="space-y-4">
            <p className="text-center">
              قد تواجه إعلانات منبثقة أثناء مشاهدة المحتوى، وذلك لأن الأفلام والمسلسلات
              يتم عرضها من خلال خوادم خارجية تابعة لأطراف ثالثة. لتحسين تجربة المشاهدة، ننصح باستخدام أداة لحظر الإعلانات (Ad-blocker) 
              في حال لم يعمل الفيلم أو توقف البث، يرجى تجربة خادم (سيرفر)
              آخر من القائمة المتوفرة داخل المشغل. بعض الخوادم قد تكون أسرع أو أكثر استقرارًا من غيرها حسب المحتوى ومصدره.
              like{" "}
              <Link href="https://ublockorigin.com/" target="_blank" className="font-bold">
                uBlock Origin
              </Link>{" "}
              أو{" "}
              <Link href="https://adblockplus.org/" target="_blank" className="font-bold">
                Adblock Plus
              </Link>
              . نحن نعمل على توفير أفضل تجربة ممكنة، لكن التحكم الكامل بالخوادم الخارجية غير ممكن، لذا نشكركم على تفهّمكم.

            </p>
          </ScrollShadow>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button color="primary" variant="shadow" onPress={handleSeen}>
            Okay, I understand
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdsWarning;
