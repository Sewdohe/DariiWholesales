import React from "react";
import { navigate } from "gatsby";
import { Navbar, Button, Link, Text } from "@nextui-org/react";

export default function Nav() {
  return (
    <div>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          {/* <AcmeLogo /> */}
          <Text b color="inherit" hideIn="xs">
            Mr.Cigars
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link
            onClick={() => {
              navigate("/shop/");
            }}
          >
            Shop
          </Navbar.Link>
          <Navbar.Link isActive href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link href="#">Account</Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <VariantsSelectorWrapper>
        <Card css={{ px: "$6", maxW: "90%" }}>
          <Card.Body>
            <Radio.Group
              defaultValue="default"
              label="Select active variant"
              orientation="horizontal"
              size="sm"
              value={variant}
              onChange={setVariant}
            >
              {variants.map((variant) => (
                <Radio key={variant} color={activeColor} value={variant}>
                  {variant}
                </Radio>
              ))}
            </Radio.Group>
            <Spacer y={0.5} />
            <Radio.Group
              defaultValue="default"
              label="Select active color"
              orientation="horizontal"
              size="sm"
              value={activeColor}
              onChange={setActiveColor}
            >
              {colors.map((color) => (
                <Radio key={color} color={activeColor} value={color}>
                  {color === "primary" ? "primary (default)" : color}
                </Radio>
              ))}
            </Radio.Group>
          </Card.Body>
        </Card>
      </VariantsSelectorWrapper>
    </div>
  );
}
