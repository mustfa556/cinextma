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
              Welcome to index - a free and open-source movie streaming website. Please read this
              disclaimer carefully before using this website.
            </p>
            <p>
              This site was developed by Voxin. This site only displays movies and TV series
              available on the internet, but we have collected them in one site and it does not 
              aim to promote or encourage digital piracy in any way.
            </p>
            <p>
              All content displayed on index (including but not limited to movies, images,
              posters, and related information) is sourced from{" "}
              <strong>third-party providers through APIs or embedding.</strong> I do not host,
              store, or distribute any media files on my servers. The website merely aggregates
              content that is already available on the internet.
            </p>
            <p>
              By using index, you acknowledge that I bears no responsibility for user actions,
              content accuracy, or any direct or indirect damages arising from the use of this
              website. Users are solely responsible for their actions while using this service. I
              respect intellectual property rights and will respond to legitimate requests from
              copyright holders for content removal.
            </p>
            <p>
              This site is a prototype for the Index platform, coming soon to iOS, Android, and TV. 
              By using Index, you agree to these terms and conditions and acknowledge that you use
              the service at your own risk. Owned by: Voxin. Thank you for reading.
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
