import { PanelTestProvider } from "lib/PanelTestProvider.jsm";
import update_schema from "content-src/asrouter/templates/OnboardingMessage/UpdateAction.schema.json";
import whats_new_schema from "content-src/asrouter/templates/OnboardingMessage/WhatsNewMessage.schema.json";
import spotlight_schema from "content-src/asrouter/templates/OnboardingMessage/Spotlight.schema.json";
import PBNewtabSchema from "content-src/asrouter/templates/PBNewtab/NewtabPromoMessage.schema.json";

describe("PanelTestProvider", () => {
  let messages;
  beforeEach(async () => {
    messages = await PanelTestProvider.getMessages();
  });
  it("should have correct number of messages", () => {
    // Careful: when changing this number make sure that new messages also go
    // through schema verifications.
    assert.lengthOf(messages, 15);
  });
  it("should be a valid message", () => {
    const updateMessages = messages.filter(
      ({ template }) => template === "update_action"
    );
    for (let message of updateMessages) {
      assert.jsonSchema(message, update_schema);
    }
  });
  it("should be a valid message", () => {
    const whatsNewMessages = messages.filter(
      ({ template }) => template === "whatsnew_panel_message"
    );
    for (let message of whatsNewMessages) {
      assert.jsonSchema(message.content, whats_new_schema);
      // Not part of `message.content` so it can't be enforced through schema
      assert.property(message, "order");
    }
  });
  it("should be a valid spotlight message", () => {
    const spotlightMessages = messages.filter(
      ({ template }) => template === "spotlight"
    );
    for (let message of spotlightMessages) {
      assert.jsonSchema(message, spotlight_schema);
    }
  });
  it("should be a valid pb newtab message", () => {
    const pbNewtabMessages = messages.filter(
      ({ template }) => template === "pb_newtab"
    );
    assert.lengthOf(pbNewtabMessages, 1);
    pbNewtabMessages.forEach(m => assert.jsonSchema(m, PBNewtabSchema));
  });
});
