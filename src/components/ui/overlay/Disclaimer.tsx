"use client";

import { useDisclosure, useInterval, useLocalStorage } from "@mantine/hooks";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ScrollShadow,
} from "@heroui/react";
import { useEffect, useState } from "react";
import clsx from "clsx";

const Disclaimer: React.FC = () => {
  const [disclaimer, setDisclaimer] = useLocalStorage<boolean>({
    key: "disclaimer-agreed",
    getInitialValueInEffect: false,
  });
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000, {
    autoInvoke: true,
  });
  const [opened, handlers] = useDisclosure(!disclaimer);
  const [seconds, setSeconds] = useState(10);

  function handleAgree() {
    handlers.close();
    setDisclaimer(true);
  }

  useEffect(() => {
    if (disclaimer || seconds < 0) {
      interval.stop();
    }
  }, [seconds]);

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
          Disclaimer
        </ModalHeader>
        <ModalBody>
          <ScrollShadow hideScrollBar className="space-y-4">
            <p>
              لا نعرض أي إعلان. الإعلانات التي تظهر في الموقع تأتي فقط من خوادم البث الخارجية.
            </p>
            <p>
              مرحبًا بك في Index — موقع مجاني ومفتوح المصدر لمشاهدة
              الأفلام والمسلسلات. يرجى قراءة هذا التنبيه القانوني بعناية قبل استخدام الموقع.
            </p>
            <p>
              تم تطوير هذا الموقع بواسطة Voxin، ويقوم فقط بعرض محتوى 
              (أفلام ومسلسلات) متوفر على الإنترنت من خلال واجهات برمجة التطبيقات (APIs) أو التضمين (Embedding). 
              نحن لا نقوم باستضافة أو تخزين أي ملفات وسائط على خوادمنا.
            </p>
            <p>
              كل المحتوى المعروض على Index، بما في ذلك الأفلام، الصور، الملصقات، والمعلومات المرتبطة، يتم جمعه
              من مزودين خارجيين. الموقع لا يشجع أو يروج للقرصنة الرقمية بأي شكل من الأشكال.

            </p>
            <p>
              باستخدامك لموقع Index، فإنك تقر بأن المسؤولية تقع على عاتقك بشكل كامل، سواء من حيث الاستخدام أو دقة المحتوى.
              نحن غير مسؤولين عن أي ضرر مباشر أو غير مباشر ناتج عن استخدام الموقع
              نحن نحترم حقوق الملكية الفكرية وسنقوم بالاستجابة لأي طلبات قانونية من أصحاب الحقوق لحذف أي محتوى مخالف.
              هذا الموقع يُعتبر نموذجًا أوليًا لمنصة Index، التي ستتوفر قريبًا على أجهزة iOS، Android، وSmart TV. باستخدامك للموقع
              ، فإنك توافق على هذه الشروط وتقر بأنك تستخدم الخدمة على مسؤوليتك الخاصة
              المالك: Voxin
              شكرًا لاستخدامك Index.
            </p>
          </ScrollShadow>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button
            className={clsx(interval.active && "pointer-events-auto cursor-not-allowed")}
            isDisabled={interval.active}
            color={interval.active ? "danger" : "primary"}
            variant="shadow"
            onPress={handleAgree}
          >
            Agree{interval.active && ` (${seconds})`}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Disclaimer;
