<?php
/**
 * ComparisonsGet200ResponseInner
 *
 * PHP version 7.4
 *
 * @category Class
 * @package  App\OpenAPI
 * @author   OpenAPI Generator team
 * @link     https://openapi-generator.tech
 */

/**
 * OpenAPI Tutorial
 *
 * OpenAPI Tutorial by halhorn
 *
 * The version of the OpenAPI document: 0.0.0
 * Generated by: https://openapi-generator.tech
 * OpenAPI Generator version: 6.6.0-SNAPSHOT
 */

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

namespace App\OpenAPI\Model;

use \ArrayAccess;
use \App\OpenAPI\ObjectSerializer;

/**
 * ComparisonsGet200ResponseInner Class Doc Comment
 *
 * @category Class
 * @package  App\OpenAPI
 * @author   OpenAPI Generator team
 * @link     https://openapi-generator.tech
 * @implements \ArrayAccess<string, mixed>
 */
class ComparisonsGet200ResponseInner implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = '_comparisons_get_200_response_inner';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'id' => 'float',
        'category' => 'string',
        'memo' => 'string',
        'title' => 'string',
        'video1Url' => 'string',
        'video1TimeSt' => 'float',
        'video1VideoType' => '\App\OpenAPI\Model\VideoType',
        'video2Url' => 'string',
        'video2TimeSt' => 'float',
        'video2VideoType' => '\App\OpenAPI\Model\VideoType',
        'anonymous' => 'bool'
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'id' => null,
        'category' => null,
        'memo' => null,
        'title' => null,
        'video1Url' => null,
        'video1TimeSt' => null,
        'video1VideoType' => null,
        'video2Url' => null,
        'video2TimeSt' => null,
        'video2VideoType' => null,
        'anonymous' => null
    ];

    /**
      * Array of nullable properties. Used for (de)serialization
      *
      * @var boolean[]
      */
    protected static array $openAPINullables = [
        'id' => false,
		'category' => false,
		'memo' => false,
		'title' => false,
		'video1Url' => false,
		'video1TimeSt' => false,
		'video1VideoType' => false,
		'video2Url' => false,
		'video2TimeSt' => false,
		'video2VideoType' => false,
		'anonymous' => false
    ];

    /**
      * If a nullable field gets set to null, insert it here
      *
      * @var boolean[]
      */
    protected array $openAPINullablesSetToNull = [];

    /**
     * Array of property to type mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPITypes()
    {
        return self::$openAPITypes;
    }

    /**
     * Array of property to format mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPIFormats()
    {
        return self::$openAPIFormats;
    }

    /**
     * Array of nullable properties
     *
     * @return array
     */
    protected static function openAPINullables(): array
    {
        return self::$openAPINullables;
    }

    /**
     * Array of nullable field names deliberately set to null
     *
     * @return boolean[]
     */
    private function getOpenAPINullablesSetToNull(): array
    {
        return $this->openAPINullablesSetToNull;
    }

    /**
     * Setter - Array of nullable field names deliberately set to null
     *
     * @param boolean[] $openAPINullablesSetToNull
     */
    private function setOpenAPINullablesSetToNull(array $openAPINullablesSetToNull): void
    {
        $this->openAPINullablesSetToNull = $openAPINullablesSetToNull;
    }

    /**
     * Checks if a property is nullable
     *
     * @param string $property
     * @return bool
     */
    public static function isNullable(string $property): bool
    {
        return self::openAPINullables()[$property] ?? false;
    }

    /**
     * Checks if a nullable property is set to null.
     *
     * @param string $property
     * @return bool
     */
    public function isNullableSetToNull(string $property): bool
    {
        return in_array($property, $this->getOpenAPINullablesSetToNull(), true);
    }

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @var string[]
     */
    protected static $attributeMap = [
        'id' => 'id',
        'category' => 'category',
        'memo' => 'memo',
        'title' => 'title',
        'video1Url' => 'video1Url',
        'video1TimeSt' => 'video1TimeSt',
        'video1VideoType' => 'video1VideoType',
        'video2Url' => 'video2Url',
        'video2TimeSt' => 'video2TimeSt',
        'video2VideoType' => 'video2VideoType',
        'anonymous' => 'anonymous'
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'id' => 'setId',
        'category' => 'setCategory',
        'memo' => 'setMemo',
        'title' => 'setTitle',
        'video1Url' => 'setVideo1Url',
        'video1TimeSt' => 'setVideo1TimeSt',
        'video1VideoType' => 'setVideo1VideoType',
        'video2Url' => 'setVideo2Url',
        'video2TimeSt' => 'setVideo2TimeSt',
        'video2VideoType' => 'setVideo2VideoType',
        'anonymous' => 'setAnonymous'
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'id' => 'getId',
        'category' => 'getCategory',
        'memo' => 'getMemo',
        'title' => 'getTitle',
        'video1Url' => 'getVideo1Url',
        'video1TimeSt' => 'getVideo1TimeSt',
        'video1VideoType' => 'getVideo1VideoType',
        'video2Url' => 'getVideo2Url',
        'video2TimeSt' => 'getVideo2TimeSt',
        'video2VideoType' => 'getVideo2VideoType',
        'anonymous' => 'getAnonymous'
    ];

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @return array
     */
    public static function attributeMap()
    {
        return self::$attributeMap;
    }

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @return array
     */
    public static function setters()
    {
        return self::$setters;
    }

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @return array
     */
    public static function getters()
    {
        return self::$getters;
    }

    /**
     * The original name of the model.
     *
     * @return string
     */
    public function getModelName()
    {
        return self::$openAPIModelName;
    }


    /**
     * Associative array for storing property values
     *
     * @var mixed[]
     */
    protected $container = [];

    /**
     * Constructor
     *
     * @param mixed[] $data Associated array of property values
     *                      initializing the model
     */
    public function __construct(array $data = null)
    {
        $this->setIfExists('id', $data ?? [], null);
        $this->setIfExists('category', $data ?? [], null);
        $this->setIfExists('memo', $data ?? [], null);
        $this->setIfExists('title', $data ?? [], null);
        $this->setIfExists('video1Url', $data ?? [], null);
        $this->setIfExists('video1TimeSt', $data ?? [], null);
        $this->setIfExists('video1VideoType', $data ?? [], null);
        $this->setIfExists('video2Url', $data ?? [], null);
        $this->setIfExists('video2TimeSt', $data ?? [], null);
        $this->setIfExists('video2VideoType', $data ?? [], null);
        $this->setIfExists('anonymous', $data ?? [], null);
    }

    /**
    * Sets $this->container[$variableName] to the given data or to the given default Value; if $variableName
    * is nullable and its value is set to null in the $fields array, then mark it as "set to null" in the
    * $this->openAPINullablesSetToNull array
    *
    * @param string $variableName
    * @param array  $fields
    * @param mixed  $defaultValue
    */
    private function setIfExists(string $variableName, array $fields, $defaultValue): void
    {
        if (self::isNullable($variableName) && array_key_exists($variableName, $fields) && is_null($fields[$variableName])) {
            $this->openAPINullablesSetToNull[] = $variableName;
        }

        $this->container[$variableName] = $fields[$variableName] ?? $defaultValue;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['id'] === null) {
            $invalidProperties[] = "'id' can't be null";
        }
        if ($this->container['category'] === null) {
            $invalidProperties[] = "'category' can't be null";
        }
        if ($this->container['memo'] === null) {
            $invalidProperties[] = "'memo' can't be null";
        }
        if ($this->container['title'] === null) {
            $invalidProperties[] = "'title' can't be null";
        }
        if ($this->container['video1Url'] === null) {
            $invalidProperties[] = "'video1Url' can't be null";
        }
        if ($this->container['video1TimeSt'] === null) {
            $invalidProperties[] = "'video1TimeSt' can't be null";
        }
        if ($this->container['video1VideoType'] === null) {
            $invalidProperties[] = "'video1VideoType' can't be null";
        }
        if ($this->container['video2Url'] === null) {
            $invalidProperties[] = "'video2Url' can't be null";
        }
        if ($this->container['video2TimeSt'] === null) {
            $invalidProperties[] = "'video2TimeSt' can't be null";
        }
        if ($this->container['video2VideoType'] === null) {
            $invalidProperties[] = "'video2VideoType' can't be null";
        }
        if ($this->container['anonymous'] === null) {
            $invalidProperties[] = "'anonymous' can't be null";
        }
        return $invalidProperties;
    }

    /**
     * Validate all the properties in the model
     * return true if all passed
     *
     * @return bool True if all properties are valid
     */
    public function valid()
    {
        return count($this->listInvalidProperties()) === 0;
    }


    /**
     * Gets id
     *
     * @return float
     */
    public function getId()
    {
        return $this->container['id'];
    }

    /**
     * Sets id
     *
     * @param float $id id
     *
     * @return self
     */
    public function setId($id)
    {
        if (is_null($id)) {
            throw new \InvalidArgumentException('non-nullable id cannot be null');
        }
        $this->container['id'] = $id;

        return $this;
    }

    /**
     * Gets category
     *
     * @return string
     */
    public function getCategory()
    {
        return $this->container['category'];
    }

    /**
     * Sets category
     *
     * @param string $category category
     *
     * @return self
     */
    public function setCategory($category)
    {
        if (is_null($category)) {
            throw new \InvalidArgumentException('non-nullable category cannot be null');
        }
        $this->container['category'] = $category;

        return $this;
    }

    /**
     * Gets memo
     *
     * @return string
     */
    public function getMemo()
    {
        return $this->container['memo'];
    }

    /**
     * Sets memo
     *
     * @param string $memo memo
     *
     * @return self
     */
    public function setMemo($memo)
    {
        if (is_null($memo)) {
            throw new \InvalidArgumentException('non-nullable memo cannot be null');
        }
        $this->container['memo'] = $memo;

        return $this;
    }

    /**
     * Gets title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->container['title'];
    }

    /**
     * Sets title
     *
     * @param string $title title
     *
     * @return self
     */
    public function setTitle($title)
    {
        if (is_null($title)) {
            throw new \InvalidArgumentException('non-nullable title cannot be null');
        }
        $this->container['title'] = $title;

        return $this;
    }

    /**
     * Gets video1Url
     *
     * @return string
     */
    public function getVideo1Url()
    {
        return $this->container['video1Url'];
    }

    /**
     * Sets video1Url
     *
     * @param string $video1Url video1Url
     *
     * @return self
     */
    public function setVideo1Url($video1Url)
    {
        if (is_null($video1Url)) {
            throw new \InvalidArgumentException('non-nullable video1Url cannot be null');
        }
        $this->container['video1Url'] = $video1Url;

        return $this;
    }

    /**
     * Gets video1TimeSt
     *
     * @return float
     */
    public function getVideo1TimeSt()
    {
        return $this->container['video1TimeSt'];
    }

    /**
     * Sets video1TimeSt
     *
     * @param float $video1TimeSt video1TimeSt
     *
     * @return self
     */
    public function setVideo1TimeSt($video1TimeSt)
    {
        if (is_null($video1TimeSt)) {
            throw new \InvalidArgumentException('non-nullable video1TimeSt cannot be null');
        }
        $this->container['video1TimeSt'] = $video1TimeSt;

        return $this;
    }

    /**
     * Gets video1VideoType
     *
     * @return \App\OpenAPI\Model\VideoType
     */
    public function getVideo1VideoType()
    {
        return $this->container['video1VideoType'];
    }

    /**
     * Sets video1VideoType
     *
     * @param \App\OpenAPI\Model\VideoType $video1VideoType video1VideoType
     *
     * @return self
     */
    public function setVideo1VideoType($video1VideoType)
    {
        if (is_null($video1VideoType)) {
            throw new \InvalidArgumentException('non-nullable video1VideoType cannot be null');
        }
        $this->container['video1VideoType'] = $video1VideoType;

        return $this;
    }

    /**
     * Gets video2Url
     *
     * @return string
     */
    public function getVideo2Url()
    {
        return $this->container['video2Url'];
    }

    /**
     * Sets video2Url
     *
     * @param string $video2Url video2Url
     *
     * @return self
     */
    public function setVideo2Url($video2Url)
    {
        if (is_null($video2Url)) {
            throw new \InvalidArgumentException('non-nullable video2Url cannot be null');
        }
        $this->container['video2Url'] = $video2Url;

        return $this;
    }

    /**
     * Gets video2TimeSt
     *
     * @return float
     */
    public function getVideo2TimeSt()
    {
        return $this->container['video2TimeSt'];
    }

    /**
     * Sets video2TimeSt
     *
     * @param float $video2TimeSt video2TimeSt
     *
     * @return self
     */
    public function setVideo2TimeSt($video2TimeSt)
    {
        if (is_null($video2TimeSt)) {
            throw new \InvalidArgumentException('non-nullable video2TimeSt cannot be null');
        }
        $this->container['video2TimeSt'] = $video2TimeSt;

        return $this;
    }

    /**
     * Gets video2VideoType
     *
     * @return \App\OpenAPI\Model\VideoType
     */
    public function getVideo2VideoType()
    {
        return $this->container['video2VideoType'];
    }

    /**
     * Sets video2VideoType
     *
     * @param \App\OpenAPI\Model\VideoType $video2VideoType video2VideoType
     *
     * @return self
     */
    public function setVideo2VideoType($video2VideoType)
    {
        if (is_null($video2VideoType)) {
            throw new \InvalidArgumentException('non-nullable video2VideoType cannot be null');
        }
        $this->container['video2VideoType'] = $video2VideoType;

        return $this;
    }

    /**
     * Gets anonymous
     *
     * @return bool
     */
    public function getAnonymous()
    {
        return $this->container['anonymous'];
    }

    /**
     * Sets anonymous
     *
     * @param bool $anonymous anonymous
     *
     * @return self
     */
    public function setAnonymous($anonymous)
    {
        if (is_null($anonymous)) {
            throw new \InvalidArgumentException('non-nullable anonymous cannot be null');
        }
        $this->container['anonymous'] = $anonymous;

        return $this;
    }
    /**
     * Returns true if offset exists. False otherwise.
     *
     * @param integer $offset Offset
     *
     * @return boolean
     */
    public function offsetExists($offset): bool
    {
        return isset($this->container[$offset]);
    }

    /**
     * Gets offset.
     *
     * @param integer $offset Offset
     *
     * @return mixed|null
     */
    #[\ReturnTypeWillChange]
    public function offsetGet($offset)
    {
        return $this->container[$offset] ?? null;
    }

    /**
     * Sets value based on offset.
     *
     * @param int|null $offset Offset
     * @param mixed    $value  Value to be set
     *
     * @return void
     */
    public function offsetSet($offset, $value): void
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    /**
     * Unsets offset.
     *
     * @param integer $offset Offset
     *
     * @return void
     */
    public function offsetUnset($offset): void
    {
        unset($this->container[$offset]);
    }

    /**
     * Serializes the object to a value that can be serialized natively by json_encode().
     * @link https://www.php.net/manual/en/jsonserializable.jsonserialize.php
     *
     * @return mixed Returns data which can be serialized by json_encode(), which is a value
     * of any type other than a resource.
     */
    #[\ReturnTypeWillChange]
    public function jsonSerialize()
    {
       return ObjectSerializer::sanitizeForSerialization($this);
    }

    /**
     * Gets the string presentation of the object
     *
     * @return string
     */
    public function __toString()
    {
        return json_encode(
            ObjectSerializer::sanitizeForSerialization($this),
            JSON_PRETTY_PRINT
        );
    }

    /**
     * Gets a header-safe presentation of the object
     *
     * @return string
     */
    public function toHeaderValue()
    {
        return json_encode(ObjectSerializer::sanitizeForSerialization($this));
    }
}


