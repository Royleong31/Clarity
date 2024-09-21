import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";

function MerchantApiCard() {
  const [buttonSaveWebhookURL, setButtonSaveWebhookURL] = useState("Save");
  const [buttonSaveWebhookAPI, setButtonSaveWebhookAPI] = useState("Save");
  const [buttonCopyClarityWebhookAPI, setButtonCopyClarityWebhookAPI] = useState("Copy");
  const [buttonCopyBackendAPI, setButtonCopyBackendAPI] = useState("Copy");
  const [webhookURL, setWebhookURL] = useState("");
  const [webhookAPI, setWebhookAPI] = useState("");

  const handleButtonClick = (
    text: string,
    buttonType: "copyClarityWebhookAPI" | "copyBackendAPI" | "saveWebhookURL" | "saveWebhookAPI"
  ) => {
    navigator.clipboard.writeText(text);
    if (buttonType === "copyClarityWebhookAPI") {
      setButtonCopyClarityWebhookAPI("Copied");
      setTimeout(() => setButtonCopyClarityWebhookAPI("Copy"), 2000);
    } else if (buttonType === "copyBackendAPI") {
      setButtonCopyBackendAPI("Copied");
      setTimeout(() => setButtonCopyBackendAPI("Copy"), 2000);
    } else if (buttonType === "saveWebhookURL") {
      setButtonSaveWebhookURL("Saved");
      setTimeout(() => setButtonSaveWebhookURL("Save"), 2000);
    } else if (buttonType === "saveWebhookAPI") {
      setButtonSaveWebhookAPI("Saved");
      setTimeout(() => setButtonSaveWebhookAPI("Save"), 2000);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1 justify-start align-left">
        <CardTitle className="text-xl text-left">Developer API integration</CardTitle>
        <CardDescription className="text-left">
          Please save the following API keys for your integration. You can revisit this later.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label className="text-left" htmlFor="webhookURL">
            Input your webhook URL
          </Label>
          <div className="flex items-center justify-between gap-2">
            <Input
              id="webhookURL"
              type="text"
              value={webhookURL}
              onChange={(e) => setWebhookURL(e.target.value)}
              placeholder="your webhook URL"
            />
            <Button onClick={() => handleButtonClick(webhookURL, "saveWebhookURL")}>
              {buttonSaveWebhookURL}
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label className="text-left" htmlFor="webhookAPI">
            Input your webhook API Key
          </Label>
          <div className="flex items-center justify-between gap-2">
            <Input
              id="webhookAPI"
              type="text"
              value={webhookAPI}
              onChange={(e) => setWebhookAPI(e.target.value)}
              placeholder="your webhook API Key"
            />
            <Button onClick={() => handleButtonClick(webhookAPI, "saveWebhookAPI")}>
              {buttonSaveWebhookAPI}
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label className="text-left" htmlFor="clarityWebhookAPI">
            Clarity Webhook API
          </Label>
          <div className="flex items-center justify-between gap-2">
            <Input
              disabled
              id="clarityWebhookAPI"
              type="text"
              placeholder="Webhook_SG2139ihsadwqjedn3n12i49123213"
            />
            <Button
              onClick={() =>
                handleButtonClick("Webhook_SG2139ihsadwqjedn3n12i49123213", "copyClarityWebhookAPI")
              }
            >
              {buttonCopyClarityWebhookAPI}
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label className="text-left" htmlFor="clarityBackendAPI">
            Clarity Backend API
          </Label>
          <div className="flex items-center justify-between gap-2">
            <Input
              disabled
              id="clarityBackendAPI"
              type="text"
              placeholder="Backend_SG2139ihsadwqjedn3n12i49123213"
            />
            <Button
              onClick={() =>
                handleButtonClick("Backend_SG2139ihsadwqjedn3n12i49123213", "copyBackendAPI")
              }
            >
              {buttonCopyBackendAPI}
            </Button>
          </div>
        </div>
        <Button variant="secondary">Link to docs</Button>
      </CardContent>
    </Card>
  );
}

export default MerchantApiCard;
